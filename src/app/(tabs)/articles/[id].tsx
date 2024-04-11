import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';
import { VariableBlurView } from '@candlefinance/blur-view';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import articleData from '@/src/assets/articleData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

const ArticleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
