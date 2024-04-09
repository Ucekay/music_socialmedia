import React from 'react';
import { View, FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';

const itemSize = 317;

export default function TabOneScreen() {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <FlashList
      data={articleData}
      renderItem={({ item }) => <ArticleSummaryCard article={item} />}
      estimatedItemSize={itemSize}
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: tabBarHeight,
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}
    />
  );
}
