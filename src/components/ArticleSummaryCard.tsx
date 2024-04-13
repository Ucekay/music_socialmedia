import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import RNColorThief from 'react-native-color-thief';
import { Image } from 'expo-image';
import { Link } from 'expo-router';

import { ArticleThumbnail } from './ArticleThumbnail';
import ArticleTag from './ArticleTag';
import { increaseSaturation, rgb2Hex } from './ColorModifier';
import type { Palette, articleDataType } from '../types';
import Colors from '../constants/Colors';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

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
  const colorScheme = useColorScheme();
  const [hexColors, setHexColors] = useState<string[]>([]);
  useEffect(() => {
    RNColorThief.getPalette(artworkUrl, 17, 2, false)
      .then((palette: Palette) => {
        const hexColors: string[] = rgb2Hex(palette);
        setHexColors(hexColors);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  const progress = useDerivedValue(() => {
    return colorScheme === 'dark' ? withTiming(1) : withTiming(0);
  }, [colorScheme]);
  const animatedBackground = useAnimatedStyle(() => {
    const backGroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.secondlyBackground, Colors.dark.secondlyBackground]
    );
    return {
      backgroundColor: backGroundColor,
    };
  });
  const animatedTextColor = useAnimatedStyle(() => {
    const textColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    );
    return {
      color: textColor,
    };
  });
  const AnimatedSecondlyTextColor = useAnimatedStyle(() => {
    const secondlyTextColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.secondlyText, Colors.dark.secondlyText]
    );
    return { color: secondlyTextColor };
  });

  if (hexColors.length === 0) return null;
  const gradientColors = hexColors.map((color) => increaseSaturation(color, 2));

  return (
    <Link href={`/articles/${article.articleID}`} asChild>
      <Pressable style={{ flex: 1 }}>
        <Animated.View style={[styles.container, animatedBackground]}>
          <ArticleThumbnail
            rows={3}
            cols={3}
            colors={gradientColors}
            play={true}
            articleID={articleID}
            artworkUrl={artworkUrl}
          />
          <View style={styles.summaryContainer}>
            <View>
              <Animated.Text style={[styles.articleTitle, animatedTextColor]}>
                {articleTitle}
              </Animated.Text>
            </View>
            <View>
              <Animated.Text style={[styles.songName, animatedTextColor]}>
                {songName}
              </Animated.Text>
              <Animated.Text
                style={[styles.artistName, AnimatedSecondlyTextColor]}
              >
                {artistName}
              </Animated.Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.authorContainer}>
                <Image source={userAvatarUrl} style={styles.avatar} />
                <View>
                  <Animated.Text style={[styles.useName, animatedTextColor]}>
                    {user}
                  </Animated.Text>
                  <Animated.Text
                    style={[styles.userID, AnimatedSecondlyTextColor]}
                  >
                    {userID}
                  </Animated.Text>
                </View>
              </View>
              <ArticleTag type={type} />
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 12,
    borderCurve: 'continuous',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,

    elevation: 10,
  },
  summaryContainer: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderCurve: 'continuous',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: '500',
  },
  songName: {
    fontSize: 17,
    fontWeight: '500',
  },
  artistName: {
    fontSize: 17,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'lightblue',
  },
  useName: {
    fontSize: 12,
  },
  userID: {
    fontSize: 11,
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
