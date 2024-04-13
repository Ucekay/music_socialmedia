import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Stack, useLocalSearchParams } from 'expo-router';
import Animated from 'react-native-reanimated';
import { VariableBlurView } from '@candlefinance/blur-view';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

import articleData from '@/src/assets/articleData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const ArticleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const windowsHeight = useWindowDimensions().height;

  const snapPoint0 = windowsHeight - 375 + 24;
  const snapPoints = useMemo(() => [snapPoint0, '80%'], []);

  const article = articleData.find((item) => item.articleID === id);
  const defaultImage = require('@/src/assets/images/snsicon.png');
  if (!article) {
    return <Text>Article not found.</Text>;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            animation: 'fade_from_bottom',
            customAnimationOnGesture: true,
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
          }}
        />

        <Image
          source={article.artworkUrl || defaultImage}
          style={styles.artwork}
        />

        <BottomSheet snapPoints={snapPoints} style={{ flex: 1 }}>
          <BottomSheetView style={styles.contentContainer}>
            <Text>This is awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
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
