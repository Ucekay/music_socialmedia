import React, { useMemo } from 'react';
import type { CubicBezierHandle } from '@shopify/react-native-skia';
import {
  Skia,
  isEdge,
  Group,
  add,
  Canvas,
  ImageShader,
  Patch,
  vec,
  useImage,
  useClock,
  Image,
  RoundedRect,
  Mask,
} from '@shopify/react-native-skia';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { createNoise2D } from './SimpleNoise';

import { symmetric } from './Math';
import { Cubic } from './Cubic';
import { Curves } from './Curves';

const rectToTexture = (
  vertices: CubicBezierHandle[],
  [tl, tr, br, bl]: number[]
) =>
  [
    vertices[tl].pos,
    vertices[tr].pos,
    vertices[br].pos,
    vertices[bl].pos,
  ] as const;

const rectToColors = (colors: string[], [tl, tr, br, bl]: number[]) => [
  colors[tl],
  colors[tr],
  colors[br],
  colors[bl],
];

const useRectToPatch = (
  mesh: SharedValue<CubicBezierHandle[]>,
  indices: number[]
): SharedValue<
  [CubicBezierHandle, CubicBezierHandle, CubicBezierHandle, CubicBezierHandle]
> =>
  useDerivedValue(() => {
    const tl = mesh.value[indices[0]];
    const tr = mesh.value[indices[1]];
    const br = mesh.value[indices[2]];
    const bl = mesh.value[indices[3]];
    return [
      {
        pos: tl.pos,
        c1: tl.c2,
        c2: tl.c1,
      },
      {
        pos: tr.pos,
        c1: symmetric(tr.c1, tr.pos),
        c2: tr.c2,
      },
      {
        pos: br.pos,
        c1: symmetric(br.c2, br.pos),
        c2: symmetric(br.c1, br.pos),
      },
      {
        pos: bl.pos,
        c1: bl.c1,
        c2: symmetric(bl.c2, bl.pos),
      },
    ];
  }, [mesh]);

interface ArticleThumbnailProps {
  rows: number;
  cols: number;
  colors: string[];
  debug?: boolean;
  lines?: boolean;
  handles?: boolean;
  play?: boolean;
  artworkUrl: string;
}

const F = 8000;
const A = 30;

export const ArticleThumbnail = ({
  rows,
  cols,
  colors,
  debug,
  lines,
  handles,
  play,
  artworkUrl,
}: ArticleThumbnailProps) => {
  const { width, height } = useWindowDimensions();
  const imageSideLength = 160;
  const articleCardWidth = width - 32;
  const window = useMemo(
    () => Skia.XYWHRect(0, 0, articleCardWidth, imageSideLength),
    [imageSideLength, articleCardWidth]
  );

  const clock = useClock();
  const image = useImage(require('../assets/images/debug.png'));
  const dx = articleCardWidth / cols;
  const dy = imageSideLength / rows;
  const C = dx / 3;

  const defaultMesh = new Array(cols + 1)
    .fill(0)
    .map((_c, col) =>
      new Array(rows + 1).fill(0).map((_r, row) => {
        const pos = vec(row * dx, col * dy);
        return {
          pos,
          c1: add(pos, vec(C, 0)),
          c2: add(pos, vec(0, C)),
        };
      })
    )
    .flat(2);
  const rects = new Array(rows)
    .fill(0)
    .map((_r, row) =>
      new Array(cols).fill(0).map((_c, col) => {
        const l = cols + 1;
        const tl = row * l + col;
        const tr = tl + 1;
        const bl = (row + 1) * l + col;
        const br = bl + 1;
        return [tl, tr, br, bl];
      })
    )
    .flat();
  const noises = defaultMesh.map(() => [
    createNoise2D(),
    createNoise2D(),
    createNoise2D(),
  ]);
  const meshNoise = useDerivedValue(() => {
    return defaultMesh.map((pt, i) => {
      if (isEdge(pt.pos, window)) {
        return pt;
      }
      const [noisePos, noiseC1, noiseC2] = noises[i];
      return {
        pos: add(
          pt.pos,
          vec(
            A * noisePos(clock.value / F, 0),
            A * noisePos(0, clock.value / F)
          )
        ),
        c1: add(
          pt.c1,
          vec(A * noiseC1(clock.value / F, 0), A * noiseC1(0, clock.value / F))
        ),
        c2: add(
          pt.c1,
          vec(A * noiseC2(clock.value / F, 0), A * noiseC2(0, clock.value / F))
        ),
      };
    });
  }, [clock]);

  const meshGesture = useSharedValue(defaultMesh);

  const mesh = play ? meshNoise : meshGesture;

  const artwork = useImage(artworkUrl);
  const rrct = {
    rect: { x: 0, y: 0, width: articleCardWidth, height: imageSideLength },
    topLeft: { x: 12, y: 12 },
    topRight: { x: 12, y: 12 },
    bottomRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 },
  };

  return (
    <View>
      <Canvas style={{ width: articleCardWidth, height: imageSideLength }}>
        {/*<Mask mask={<RoundedRect rect={rrct} />}>*/}
        <Group>
          <ImageShader image={image} tx='repeat' ty='repeat' />
          {rects.map((r, i) => {
            return (
              <RectPatch
                key={i}
                r={r}
                mesh={mesh}
                debug={debug}
                lines={lines}
                colors={colors}
                defaultMesh={defaultMesh}
              />
            );
          })}
        </Group>

        {defaultMesh.map(({ pos }, index) => {
          if (isEdge(pos, window) || !handles) {
            return null;
          }
          return (
            <Cubic
              key={index}
              mesh={mesh}
              index={index}
              color={colors[index]}
            />
          );
        })}
        <Image
          image={artwork}
          x={(articleCardWidth - imageSideLength) / 2}
          y={0}
          width={imageSideLength}
          height={imageSideLength}
          fit='contain'
        />
        {/*</Mask>*/}
      </Canvas>
    </View>
  );
};

interface RectPatchProps {
  r: number[];
  debug?: boolean;
  lines?: boolean;
  colors: string[];
  mesh: SharedValue<CubicBezierHandle[]>;
  defaultMesh: CubicBezierHandle[];
}

const RectPatch = ({
  r,
  debug,
  lines,
  colors,
  mesh,
  defaultMesh,
}: RectPatchProps) => {
  const patch = useRectToPatch(mesh, r);
  return (
    <>
      <Patch
        patch={patch}
        colors={debug ? undefined : rectToColors(colors, r)}
        texture={rectToTexture(defaultMesh, r)}
      />
      {lines && <Curves patch={patch} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  Thumbnail: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
