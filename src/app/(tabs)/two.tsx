import React from 'react';
import { FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';

export default function TabTwoScreen() {
  return (
    <FlashList
      data={articleData}
      renderItem={({ item }) => <ArticleSummaryCard article={item} />}
      keyExtractor={(item) => item.articleID}
      estimatedItemSize={317}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}
