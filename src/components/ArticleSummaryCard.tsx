import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNColorThief from 'react-native-color-thief';
import { Image } from 'expo-image';

import { ArticleThumbnail } from './ArticleThumbnail';
import { increaseSaturation, rgb2Hex } from '../constants/ColorModifier';
import type { Palette, articleDataType } from '../types';
import { COLORS } from '../constants/Colors';

export default function ArticleSummaryCard({
  article,
}: {
  article: articleDataType;
}) {
  const [hexColors, setHexColors] = useState<string[]>([]);
  useEffect(() => {
    const albumArt =
      'https://m.media-amazon.com/images/I/81WewepiK2L._UF1000,1000_QL80_.jpg';
    const albumArt2 =
      'https://www.sonymusic.co.jp/adm_image/common/artist_image/70009000/70009283/jacket_image/302951.jpg';
    RNColorThief.getPalette(albumArt2, 17, 10, false)
      .then((palette: Palette) => {
        const hexColors: string[] = rgb2Hex(palette);
        setHexColors(hexColors);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);
  if (hexColors.length === 0) return null;
  const gradientColors = hexColors.map((color) => increaseSaturation(color, 2));

  const {
    articleID,
    articleTitle,
    songName,
    artistName,
    userID,
    user,
    userAvatarUrl,
  } = article;

  return (
    <View style={styles.container}>
      <ArticleThumbnail rows={3} cols={3} colors={gradientColors} play={true} />
      <View style={styles.summaryContainer}>
        <View>
          <Text style={styles.articleTitle}>{articleTitle}</Text>
        </View>
        <View>
          <Text style={styles.songName}>{songName}</Text>
          <Text style={styles.artistName}>{artistName}</Text>
        </View>
        <Image source={userAvatarUrl} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  summaryContainer: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  textContainer: {},
  articleTitle: {
    fontSize: 28,
  },
  songName: {
    fontSize: 16,
  },
  artistName: {
    fontSize: 16,
    color: COLORS.neutral700,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'blue',
  },
});

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
