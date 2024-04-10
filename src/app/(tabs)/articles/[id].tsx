import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';
import { VariableBlurView } from '@candlefinance/blur-view';

import EntryBottomSheet from '@/src/components/EntryBottomSheet';
import articleData from '@/src/assets/articleData';

const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

const ArticleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const article = articleData.find((item) => item.articleID === id);
  const defaultImage = require('@/src/assets/images/snsicon.png');
  if (!article) {
    return <Text>Article not found.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: '',
          headerBackVisible: false,
          headerTransparent: true,
          header: () => (
            <VariableBlurView
              style={{
                height: top,
              }}
            />
          ),

          animation: 'fade',
        }}
      />
      <AnimatedExpoImage
        source={article.artworkUrl || defaultImage}
        sharedTransitionTag={`image-${id}`}
        style={styles.artwork}
      />
      <EntryBottomSheet />
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
