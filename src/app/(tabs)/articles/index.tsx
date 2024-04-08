import React from 'react';
import { FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';

export default function TabOneScreen() {
  return (
    <FlashList
      data={articleData}
      renderItem={({ item }) => <ArticleSummaryCard article={item} />}
      estimatedItemSize={317}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    />
  );
}
