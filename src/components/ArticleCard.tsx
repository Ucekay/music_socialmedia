import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { Link, useSegments } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import RNColorThief from 'react-native-color-thief';

import { useTheme } from '../contexts/ColorThemeContext';
import { MeshGradient } from './MeshGradient';
import ArticleCardImage from './ArticleCardImage';
import ArticleTag from './ArticleTag';
import ArticleCardSubhead from './ArticleCardSubhead';
import type { Palette, articleDataType } from '../types';
import Colors from '../constants/Colors';
import { increaseSaturation, rgb2Hex } from './ColorModifier';

export default function ArticleCard({ article }: { article: articleDataType }) {
  const { articleTitle, imageUrl, userID, user, userAvatarUrl, type } = article;
  const [hexColors, setHexColors] = useState<string[]>([]);
  useEffect(() => {
    RNColorThief.getPalette(imageUrl, 17, 10, false)
      .then((palette: Palette) => {
        const hexColors: string[] = rgb2Hex(palette);
        setHexColors(hexColors);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  const { colors } = useTheme();

  const themeBackgroundStyle = { backgroundColor: colors.secondaryBackground };
  const themeTextColor = { color: colors.text };
  const themeSecondlyTextColor = { color: colors.secondaryText };

  let gradientColors: string[];
  if (hexColors.length === 0) {
    return null;
  } else {
    gradientColors = hexColors.map((color) => increaseSaturation(color, 2));
  }

  return (
    <Link href={`/articlesScreen/${article.articleID}`} asChild>
      <Pressable style={{ flex: 1 }}>
        <Animated.View
          entering={FadeIn}
          style={[styles.container, themeBackgroundStyle]}
        >
          <ArticleCardVisual
            imageUrl={imageUrl}
            articleType={type}
            gradientColors={gradientColors}
          />
          <View style={styles.summaryContainer}>
            <View>
              <Text
                style={[styles.articleTitle, themeTextColor]}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                {articleTitle}
              </Text>
            </View>
            <ArticleCardSubhead article={article} />
            <View style={styles.infoContainer}>
              <Link href={`/profile/${userID}`} asChild>
                <Pressable style={styles.authorContainer}>
                  <Image source={userAvatarUrl} style={styles.avatar} />
                  <View>
                    <Text style={[styles.useName, themeTextColor]}>{user}</Text>
                    <Text style={[styles.userID, themeSecondlyTextColor]}>
                      {userID}
                    </Text>
                  </View>
                </Pressable>
              </Link>
              <ArticleTag type={type} />
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
}

interface ArticleCardVisualProps {
  imageUrl: string;
  articleType: string;
  gradientColors: string[];
}

const ArticleCardVisual = ({
  imageUrl,
  articleType,
  gradientColors,
}: ArticleCardVisualProps) => {
  const { width, height } = useWindowDimensions();

  //if (!gradientColors) gradientColors = palette.otto;
  if (articleType === 'review' || articleType === 'playlist') {
    return (
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          width: '100%',
          padding: 12,
          paddingBottom: 0,
        }}
      >
        <View
          style={{
            alignSelf: 'flex-start',
            borderRadius: 8,
            borderCurve: 'continuous',
            overflow: 'hidden',
          }}
        >
          <Image source={imageUrl} style={{ width: 100, aspectRatio: 1 }} />
        </View>
        <View
          style={{
            borderRadius: 8,
            borderCurve: 'continuous',
            overflow: 'hidden',
          }}
        >
          <MeshGradient
            rows={2}
            cols={3}
            width={width - 64 - 100 - 12}
            height={100}
            colors={gradientColors}
          />
        </View>
      </View>
    );
  } else if (articleType === 'liveReport' || articleType === 'general') {
    return <ArticleCardImage imageUrl={imageUrl} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 20,
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
    padding: 12,
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
