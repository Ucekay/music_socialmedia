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

const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

const ArticleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const windowsHeight = useWindowDimensions().height;
  console.log('windowsHeight', windowsHeight);
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
        <BottomSheet snapPoints={snapPoints} style={{ flex: 1 }}>
          <BottomSheetView style={styles.contentContainer}>
            <ScrollView >
            </>
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
  imageContainer:{
    flex:1
  },
  image:{
    width: 400,
    height: 400
  },
  bottomSheetContainer: {
    flex: 1,
    alignItems: 'center'
  },
  bottomSheet: {
    color: '#ffffff'
  },
  contentContainer: {
    flexGrow: 1,
    overflow: "hidden",
  },
});

