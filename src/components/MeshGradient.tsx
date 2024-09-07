import type { CubicBezierHandle } from '@shopify/react-native-skia';
import {
  Canvas,
  Group,
  ImageShader,
  Patch,
  Skia,
  add,
  useClock,
  useImage,
  vec,
} from '@shopify/react-native-skia';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';

import { createNoise2D } from './forMeshGradient/SimpleNoise';

import { Cubic } from './forMeshGradient/Cubic';
import { Curves } from './forMeshGradient/Curves';
import { symmetric } from './forMeshGradient/Math';

const rectToTexture = (
  vertices: CubicBezierHandle[],
  [tl, tr, br, bl]: number[],
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
  indices: number[],
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
interface MeshGradient {
  rows: number;
  cols: number;
  colors: string[];
  debug?: boolean;
  lines?: boolean;
  handles?: boolean;
  width: number;
  height: number;
}

const F = 10000;
const A = 30;

export const MeshGradient = ({
  rows,
  cols,
  colors,
  debug,
  lines,
  handles,
  width,
  height,
}: MeshGradient) => {
  const window = useMemo(
    () => Skia.XYWHRect(0, 0, width, height),
    [height, width],
  );

  const clock = useClock();
  const image = useImage(require('@/src/assets/images/debug.png'));
  const dx = width / cols;
  const dy = height / rows;
  const C = dx / 3;

  const defaultMesh = useMemo(() => {
    return new Array(rows + 1).fill(0).flatMap((_, row) =>
      new Array(cols + 1).fill(0).map((_, col) => {
        const pos = vec(col * dx, row * dy);
        return {
          pos,
          c1: add(pos, vec(C, 0)),
          c2: add(pos, vec(0, C)),
        };
      }),
    );
  }, [rows, cols, dx, dy, C]);
  const rects = new Array(rows).fill(0).flatMap((_r, row) =>
    new Array(cols).fill(0).map((_c, col) => {
      const l = cols + 1;
      const tl = row * l + col;
      const tr = tl + 1;
      const bl = (row + 1) * l + col;
      const br = bl + 1;
      return [tl, tr, br, bl];
    }),
  );
  const noises = defaultMesh.map(() => [
    createNoise2D(),
    createNoise2D(),
    createNoise2D(),
  ]);

  const edgePoints = useMemo(() => {
    return defaultMesh.map((pt, index) => {
      const row = Math.floor(index / (cols + 1));
      const col = index % (cols + 1);
      return row === 0 || row === rows || col === 0 || col === cols;
    });
  }, [defaultMesh, rows, cols]);

  const sharedEdgePoints = useSharedValue(edgePoints);

  const meshNoise = useDerivedValue(() => {
    return defaultMesh.map((pt, i) => {
      if (sharedEdgePoints.value[i]) {
        return pt;
      }
      const [noisePos, noiseC1, noiseC2] = noises[i];
      return {
        pos: add(
          pt.pos,
          vec(
            A * noisePos(clock.value / F, 0),
            A * noisePos(0, clock.value / F),
          ),
        ),
        c1: add(
          pt.c1,
          vec(A * noiseC1(clock.value / F, 0), A * noiseC1(0, clock.value / F)),
        ),
        c2: add(
          pt.c1,
          vec(A * noiseC2(clock.value / F, 0), A * noiseC2(0, clock.value / F)),
        ),
      };
    });
  }, [clock]);

  const mesh = meshNoise;

  return (
    <View>
      <Canvas style={{ width, height }}>
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
          if (sharedEdgePoints.value[index] || !handles) {
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
  blur: {
    position: 'absolute',
  },
});
