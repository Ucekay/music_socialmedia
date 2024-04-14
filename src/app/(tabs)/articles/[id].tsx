import React, { useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { VariableBlurView } from '@ucekay/blur-view-fix';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import articleData from '@/src/assets/articleData';

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
