import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/src/constants/Colors';
import Animated from 'react-native-reanimated';

import ArticleCard from '@/src/components/ArticleCard';
import articleData from '@/src/assets/articleData';
import type { articleDataType } from '@/src/types';

const itemSize = 308;

export default function TabOneScreen() {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'dark'
      ? { backgroundColor: Colors.dark.background }
      : { backgroundColor: Colors.light.background };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <FlashList
        data={articleData}
        renderItem={({ item }) => (
          <ArticleCard article={item as articleDataType} />
        )}
        estimatedItemSize={itemSize}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: tabBarHeight,
          paddingHorizontal: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
