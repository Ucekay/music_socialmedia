import { useLocalSearchParams } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

import articleData from '@/src/assets/articleData';
import SecondaryBgView from '@/src/components/ThemedSecondaryBgView';
import { ArticleThumbnail } from '@/src/components/ArticleThumbnail';
import { Palette } from '@/src/types';
import { increaseSaturation, rgb2Hex } from '@/src/util/color/ColorModifier';
import { usePalette } from '@/src/hooks/usePallete';
import Text from '@/src/components/ThemedText';
import { Bold } from 'iconoir-react-native';
import ArticleCardSubhead from '@/src/components/ArticleCardSubhead';

const BgView = SecondaryBgView;

const ArticleDetailsScreen = () => {
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

  return (
    <BgView style={{ flex: 1, padding: 16, paddingTop: headerHeight + 16 }}>
      <View style={{ height: ((screenWidth - 32) / 16) * 9 }}>
        <ArticleThumbnail
          imageUrl={article.imageUrl}
          articleType={article.type}
          width={screenWidth - 32}
        />
      </View>
      <View style={{ marginTop: 32, gap: 12 }}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            {article.articleTitle}
          </Text>
        </View>
        <View>
          <ArticleCardSubhead size='md' article={article} />
        </View>
      </View>
    </BgView>
  );
};

export default ArticleDetailsScreen;
