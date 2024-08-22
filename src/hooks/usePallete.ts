import { useCallback, useState, useEffect } from 'react';
import RNColorThief from 'react-native-color-thief';
import { rgb2Hex } from '@/src/utils/color/ColorModifier';
import type { Palette } from '../types';

export function usePalette(imageUrl: string) {
  const [hexColors, setHexColors] = useState<string[]>([]);

  const getPalette = useCallback(async () => {
    try {
      const palette: Palette = await RNColorThief.getPalette(
        imageUrl,
        13,
        20,
        false
      );
      return rgb2Hex(palette);
    } catch (error) {
      console.log('Error getting palette:', error);
      return [];
    }
  }, [imageUrl]);

  useEffect(() => {
    getPalette().then(setHexColors);
  }, [getPalette]);

  return hexColors;
}
