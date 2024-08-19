import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, useWindowDimensions } from 'react-native';
import RNColorThief from 'react-native-color-thief';

import articleData from '@/src/assets/articleData';
import SecondaryBgView from '@/src/components/ThemedSecondaryBgView';
import { ArticleThumbnail } from '@/src/components/ArticleThumbnail';
import { Palette } from '@/src/types';
import { increaseSaturation, rgb2Hex } from '@/src/components/ColorModifier';

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

  const [hexColors, setHexColors] = useState<string[]>([]);
  useEffect(() => {
    RNColorThief.getPalette(article.imageUrl, 17, 10, false)
      .then((palette: Palette) => {
        const hexColors: string[] = rgb2Hex(palette);
        setHexColors(hexColors);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, []);

  let gradientColors: string[];
  if (hexColors.length === 0) {
    return null;
  } else {
    gradientColors = hexColors.map((color) => increaseSaturation(color, 2));
  }

  return (
    <BgView>
      <ArticleThumbnail
        imageUrl={article.imageUrl}
        articleType={article.type}
        gradientColors={gradientColors}
        width={screenWidth - 32}
      />
    </BgView>
  );
};

export default ArticleDetailsScreen;
