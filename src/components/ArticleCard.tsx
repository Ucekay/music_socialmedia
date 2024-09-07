import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useTheme } from '../contexts/ColorThemeContext';
import type { ArticleData } from '../types';
import ArticleCardSubhead from './ArticleCardSubhead';
import ArticleTag from './ArticleTag';
import { ArticleThumbnail } from './ArticleThumbnail';
import Text from './ThemedText';

export default function ArticleCard({ article }: { article: ArticleData }) {
  const { articleTitle, imageUrl, userID, user, userAvatarUrl, type } = article;

  const { colors } = useTheme();

  const themeBackgroundStyle = { backgroundColor: colors.secondaryBackground };
  const themeSecondaryTextColor = { color: colors.secondaryText };

  return (
    <Link href={`./article-screen/${article.articleID}`} asChild>
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
                style={[styles.articleTitle]}
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
                    <Text style={[styles.authorName]}>{user}</Text>
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
    height: 100,
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
