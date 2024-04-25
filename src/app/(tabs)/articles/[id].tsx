import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { VariableBlurView } from '@ucekay/blur-view-fix';

import articleData from '@/src/assets/articleData';

const ArticleDetailScreen = () => {
  const platform = Platform.OS;
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const windowsHeight = useWindowDimensions().height;

  const header = () => {
    if (platform === 'ios') {
      return (
        <VariableBlurView
          style={{
            height: top,
          }}
        />
      );
    } else {
      return (
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
      );
    }
  };

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
            header: () => header(),
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
