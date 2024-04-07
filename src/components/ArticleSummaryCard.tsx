import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import RNColorThief from 'react-native-color-thief';
import { Image } from 'expo-image';

import { ArticleThumbnail } from './ArticleThumbnail';
import ArticleTag from './ArticleTag';
// import { increaseSaturation, rgb2Hex } from '../constants/ColorModifier';
import type { Palette, articleDataType } from '../types';
import { COLORS } from '../constants/Colors';

export default function ArticleSummaryCard({
  article,
}: {
  article: articleDataType;
}) {
  const {
    articleID,
    articleTitle,
    songName,
    artistName,
    artworkUrl,
    userID,
    user,
    userAvatarUrl,
    type,
  } = article;

  // const [hexColors, setHexColors] = useState<string[]>([]);
  // useEffect(() => {
  //   RNColorThief.getPalette(artworkUrl, 17, 2, false)
  //     .then((palette: Palette) => {
  //       const hexColors: string[] = rgb2Hex(palette);
  //       setHexColors(hexColors);
  //     })
  //     .catch((error: Error) => {
  //       console.log(error);
  //     });
  // }, []);
  // if (hexColors.length === 0) return null;
  // const gradientColors = hexColors.map((color) => increaseSaturation(color, 2));

  return (
    <View style={styles.container}>
      <ArticleThumbnail
        rows={3}
        cols={3}
        colors={palette.otto}
        play={true}
        artworkUrl={artworkUrl}
      />
      <View style={styles.summaryContainer}>
        <View>
          <Text style={styles.articleTitle}>{articleTitle}</Text>
        </View>

        <View>
          <Text style={styles.songName}>{songName}</Text>
          <Text style={styles.artistName}>{artistName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.authorContainer}>
            <Image source={userAvatarUrl} style={styles.avatar} />
            <View>
              <Text>{user}</Text>
              <Text style={styles.userID}>{userID}</Text>
            </View>
          </View>
          <ArticleTag type={type} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  articleTitle: {
    fontSize: 28,
  },
  songName: {
    fontSize: 20,
  },
  artistName: {
    fontSize: 16,
    color: COLORS.neutral700,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 14,
    backgroundColor: 'lightblue',
  },
  userID: {
    fontSize: 11,
    color: COLORS.neutral700,
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
