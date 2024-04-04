import React, { useState, useEffect } from 'react';
//import { getColors } from 'react-native-image-colors';
import RNColorThief from 'react-native-color-thief';

import { CoonsPatchMeshGradient } from '../../components/CoonsPatchMeshGradient';
import { increaseSaturation, rgb2Hex } from '../../constants/ColorModifier';
//import { increaseSaturation } from '@/src/constants/ColorModifier';

//interface ImageColorResult {
//  [key: string]: string;
//  background: string;
//  detail: string;
//  primary: string;
//  secondary: string;
//  platform: string;
//}

//const useImageColor = () => {
//  const [colors, setColors] = useState<ImageColorResult | null>(null);
//
//  useEffect(() => {
//    const albumArt =
//      'https://m.media-amazon.com/images/I/81WewepiK2L._UF1000,1000_QL80_.jpg';
//
//    getColors(albumArt, { quality: 'highest' }).then(setColors);
//  }, []);
//  return colors;
//};

export default function TabTwoScreen() {
  //  const UIImageColors = useImageColor();
  //  const excludedKey = 'platform';
  //  if (!UIImageColors) return null;
  //  let imagePalette = Object.keys(UIImageColors)
  //    .filter((key) => key !== excludedKey)
  //    .map((key) => UIImageColors[key] as string);
  //  imagePalette = imagePalette.map((color) => increaseSaturation(color, 2));
  //  const repeatedPalette = [
  //    ...imagePalette,
  //    ...imagePalette,
  //    ...imagePalette,
  //    ...imagePalette,
  //  ].sort(() => Math.random() - 0.5);

  const [hexColors, setHexColors] = useState<string[]>([]);

  useEffect(() => {
    const albumArt =
      'https://m.media-amazon.com/images/I/81WewepiK2L._UF1000,1000_QL80_.jpg';
    const albumArt2 =
      'https://www.sonymusic.co.jp/adm_image/common/artist_image/70009000/70009283/jacket_image/302951.jpg';
    RNColorThief.getPalette(albumArt2, 17, 10, false)
      .then((palette) => {
        const hexColors = rgb2Hex(palette);
        setHexColors(hexColors);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (hexColors.length === 0) return null;
  const gradientColors = hexColors.map((color) => increaseSaturation(color, 2));

  return (
    <CoonsPatchMeshGradient
      rows={3}
      cols={3}
      colors={gradientColors}
      play={true}
    />
  );
}

const palette = {
  otto: [
    '#FEF8C4',
    '#E1F1D5',
    '#C4EBE5',
    '#ECA171',
    '#FFFCF3',
    '#D4B3B7',
    '#B5A8D2',
    '#F068A1',
    '#EDD9A2',
    '#FEEFAB',
    '#A666C0',
    '#8556E5',
    '#DC4C4C',
    '#EC795A',
    '#E599F0',
    '#96EDF2',
  ],
  will: [
    '#2D4CD2',
    '#36B6D9',
    '#3CF2B5',
    '#37FF5E',
    '#59FB2D',
    '#AFF12D',
    '#DABC2D',
    '#D35127',
    '#D01252',
    '#CF0CAA',
    '#A80DD8',
    '#5819D7',
  ],
  skia: [
    '#61DAFB',
    '#dafb61',
    '#61fbcf',
    '#61DAFB',
    '#fb61da',
    '#61fbcf',
    '#dafb61',
    '#fb61da',
    '#61DAFB',
    '#fb61da',
    '#dafb61',
    '#61fbcf',
    '#fb61da',
    '#61DAFB',
    '#dafb61',
    '#61fbcf',
  ],
};
