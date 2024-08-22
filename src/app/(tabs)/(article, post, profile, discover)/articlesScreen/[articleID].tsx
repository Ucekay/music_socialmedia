import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  View,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Image } from 'expo-image';
import * as IconoirIcons from 'iconoir-react-native';

import articleData from '@/src/assets/articleData';
import SecondaryBgView from '@/src/components/ThemedSecondaryBgView';
import { ArticleThumbnail } from '@/src/components/ArticleThumbnail';
import Text from '@/src/components/ThemedText';
import ArticleCardSubhead from '@/src/components/ArticleCardSubhead';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import HeartIcon from '@/src/components/Icons/HeartIcon';
import { Button } from '@/src/components/Button';

const BgView = SecondaryBgView;

const ArticleDetailsScreen = () => {
  const { colors } = useTheme();
  const screenWidth = useWindowDimensions().width;
  const { articleID } = useLocalSearchParams();
  const article = articleData.find(
    (article) => article.articleID === articleID
  );
  if (!article) {
    return (
      <View>
        <Text>Article not found</Text>
      </View>
    );
  }

  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const thumbnailHeight = ((screenWidth - 32) / 16) * 9;

  return (
    <BgView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View
          style={[
            styles.contentContainer,
            {
              paddingTop: headerHeight + 16,
              paddingBottom: tabBarHeight + 16,
            },
          ]}
        >
          <View
            style={[styles.thumbnailContainer, { height: thumbnailHeight }]}
          >
            <ArticleThumbnail
              imageUrl={article.imageUrl}
              articleType={article.type}
              width={screenWidth - 32}
            />
          </View>
          <View style={styles.articleInfoContainer}>
            <View>
              <Text style={styles.articleTitle}>{article.articleTitle}</Text>
            </View>
            <View>
              {article.type !== 'general' && (
                <ArticleCardSubhead size='md' article={article} />
              )}
            </View>
            <View style={styles.authorContainer}>
              <Image
                source={article.userAvatarUrl}
                style={styles.authorAvatar}
              />
              <View>
                <Text>{article.user}</Text>
                <Text style={{ color: colors.secondaryText }}>
                  {article.userID}
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => console.log('Button pressed')}
                  text='曲を再生'
                  icon='Play'
                  renderIcon={({ name, size, color }) => {
                    const IconComponent = IconoirIcons[name];
                    return (
                      <IconComponent
                        width={size}
                        height={size}
                        color={color}
                        fill={color}
                      />
                    );
                  }}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  onPress={() => console.log('Button pressed')}
                  text='いいね'
                  icon={<HeartIcon width={16} height={16} />}
                  variant='outline'
                />
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.articleBody}>{article.articleBody}</Text>
          </View>
        </View>
      </ScrollView>
    </BgView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    gap: 24,
    padding: 16,
  },
  thumbnailContainer: {
    width: '100%',
  },
  articleInfoContainer: {
    gap: 12,
  },
  articleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
    gap: 8,
  },
  buttonWrapper: {
    flex: 1,
  },
  articleBody: {
    fontSize: 16,
  },
});

export default ArticleDetailsScreen;
