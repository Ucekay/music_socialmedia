import React, { useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet, { BottomSheetView, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import articleData from '@/src/assets/articleData';
import { Line } from 'react-native-svg';
import ArticleScroll from '@/src/components/ArticleScroll';

const ArticleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
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
              <>
                <LinearGradient
                  colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: top,
                  }}
                />
                <BlurView
                  tint='regular'
                  style={{
                    height: top,
                  }}
                />
              </>
            ),
          }}
        />

        <Image
          source={article.artworkUrl || defaultImage}
          style={styles.artwork}
        />

        <BottomSheet snapPoints={snapPoints} style={{ flex: 1 }}>
          <BottomSheetScrollView> 
            <ArticleScroll {...article}/>
          </BottomSheetScrollView>
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
