import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';

import articleData from '@/src/assets/articleData';
import { articleDataType } from '@/src/types';

const ArticleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const firstGradientStop = top / headerHeight;
  const article = articleData.find((item) => item.articleID === id);
  const defaultImage = require('@/src/assets/images/snsicon.png');
  if (!article) {
    return <Text>Article not found.</Text>;
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: '',
          headerShown: true,
          headerBackVisible: false,
          headerTransparent: true,
          headerBackground: () => (
            <LinearGradient
              colors={['rgba(256,267,256,0.8)', 'transparent']}
              style={StyleSheet.absoluteFill}
            />
          ),
        }}
      />
      <Image src={article.artworkUrl || defaultImage} style={styles.artwork} />
      <Text>Article Detail Screen : {id}</Text>
    </View>
  );
};

export default ArticleDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artwork: {
    width: '100%',
    aspectRatio: 1,
  },
});
