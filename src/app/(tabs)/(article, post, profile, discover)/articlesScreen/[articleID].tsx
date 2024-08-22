import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View, useWindowDimensions } from 'react-native';
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

  return (
    <BgView style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            gap: 24,
            padding: 16,
            paddingTop: headerHeight + 16,
            paddingBottom: tabBarHeight + 16,
          }}
        >
          <View style={{ height: ((screenWidth - 32) / 16) * 9 }}>
            <ArticleThumbnail
              imageUrl={article.imageUrl}
              articleType={article.type}
              width={screenWidth - 32}
            />
          </View>
          <View style={{ gap: 12 }}>
            <View>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                {article.articleTitle}
              </Text>
            </View>
            <View>
              {article.type !== 'general' && (
                <ArticleCardSubhead size='md' article={article} />
              )}
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
            >
              <Image
                source={article.userAvatarUrl}
                style={{ width: 36, height: 36, borderRadius: 100 }}
              />
              <View>
                <Text>{article.user}</Text>
                <Text style={{ color: colors.secondaryText }}>
                  {article.userID}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginTop: 8,
                gap: 8,
              }}
            >
              <Button
                onPress={() => console.log('Button pressed')}
                text='曲を再生'
                icon='Play'
                renderIcon={({ name, size, color }) => {
                  const IconComponent = IconoirIcons[name];
                  return (
                    <IconComponent width={size} height={size} color={color} />
                  );
                }}
                variant='solid'
                size='medium'
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: colors.border,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <HeartIcon width={16} height={16} />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '500',
                      color: colors.secondaryText,
                    }}
                  >
                    いいね
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{article.articleBody}</Text>
          </View>
        </View>
      </ScrollView>
    </BgView>
  );
};

export default ArticleDetailsScreen;
