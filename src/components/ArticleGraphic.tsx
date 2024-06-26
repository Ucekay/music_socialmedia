import React, { useMemo } from 'react';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
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
} from '@shopify/react-native-skia';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  FadeIn,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import { createNoise2D } from './forMeshGradient/SimpleNoise';

import { symmetric } from './forMeshGradient/Math';
import { Cubic } from './forMeshGradient/Cubic';
import { Curves } from './forMeshGradient/Curves';

const AnimatedImage = Animated.createAnimatedComponent(Image);

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

interface ArticleGraphicProps {
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
const A = 60;

export const ArticleGraphic = ({
  rows,
  cols,
  colors,
  debug,
  lines,
  handles,
  play,
  artworkUrl,
}: ArticleGraphicProps) => {
  const { width, height } = useWindowDimensions();

  const articleCardWidth = width - 40;
  const imageSideLength = ((width - 40) / 21) * 9;
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

  const defaultImage = require('@/src/assets/images/snsicon.png');

  return (
    <View style={styles.container}>
      <Canvas style={{ width: '100%', height: imageSideLength }}>
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
      </Canvas>

      <AnimatedImage
        source={artworkUrl || defaultImage}
        entering={FadeIn}
        style={styles.image}
      />
      <BlurView intensity={25} style={styles.blur} />
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    position: 'absolute',
    aspectRatio: 1,
    zIndex: 1,
  },
  blur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
