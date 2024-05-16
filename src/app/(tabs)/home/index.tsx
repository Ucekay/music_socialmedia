import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useColorScheme } from 'react-native';

import Colors from '@/src/constants/Colors';
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
          paddingHorizontal: 20,
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
