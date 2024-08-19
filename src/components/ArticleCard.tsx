import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import RNColorThief from 'react-native-color-thief';

import { useTheme } from '../contexts/ColorThemeContext';
import ArticleTag from './ArticleTag';
import ArticleCardSubhead from './ArticleCardSubhead';
import type { Palette, articleDataType as ArticleData } from '../types';
import { increaseSaturation, rgb2Hex } from './ColorModifier';
import { ArticleThumbnail } from './ArticleThumbnail';

export default function ArticleCard({ article }: { article: ArticleData }) {
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
  const themeSecondaryTextColor = { color: colors.secondaryText };

  let gradientColors: string[];
  if (hexColors.length === 0) {
    return null;
  } else {
    gradientColors = hexColors.map((color) => increaseSaturation(color, 2));
  }

  return (
    <Link href={`/articlesScreen/${article.articleID}`} asChild>
      <Pressable style={styles.cardWrapper}>
        <Animated.View
          entering={FadeIn}
          style={[styles.cardContainer, themeBackgroundStyle]}
        >
          <View style={styles.cardHeader}>
            <View style={styles.thumbnailWrapper}>
              <ArticleThumbnail
                imageUrl={imageUrl}
                articleType={type}
                gradientColors={gradientColors}
                height={100}
              />
              <View style={styles.tagContainer}>
                <ArticleTag type={type} />
              </View>
            </View>
          </View>
          <View style={styles.cardContent}>
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
            <View style={styles.cardFooter}>
              <Link href={`/profile/${userID}`} asChild>
                <Pressable style={styles.authorInfo}>
                  <Image source={userAvatarUrl} style={styles.authorAvatar} />
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.authorName, themeTextColor]}>
                      {user}
                    </Text>
                    <Text style={[styles.authorId, themeSecondaryTextColor]}>
                      {userID}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    </Link>
  );
}

export const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
  },
  cardContainer: {
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
  cardHeader: {
    flexDirection: 'row',
    padding: 12,
    paddingBottom: 0,
    gap: 8,
  },
  thumbnailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  thumbnailContainer: {
    aspectRatio: 16 / 9,
  },
  tagContainer: {},
  cardContent: {
    width: '100%',
    padding: 12,
    gap: 8,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderCurve: 'continuous',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  authorAvatar: {
    width: 16,
    height: 16,
    borderRadius: 14,
    backgroundColor: 'lightblue',
  },
  authorName: {
    fontSize: 12,
  },
  authorId: {
    fontSize: 11,
  },
  overlayImageContainer: {
    position: 'absolute',
    height: '100%',
    padding: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 1,
  },
  overlayImageWrapper: {
    borderRadius: 8,
    borderCurve: 'continuous',
    overflow: 'hidden',
    width: 92,
    aspectRatio: 1,
  },
  overlayImage: {
    width: '100%',
    height: '100%',
  },
  gradientContainer: {
    borderRadius: 8,
    borderCurve: 'continuous',
    overflow: 'hidden',
  },
  fullWidthImageContainer: {
    flex: 1,
    width: '100%',
  },
});
