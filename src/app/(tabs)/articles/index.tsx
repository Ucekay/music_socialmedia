import React from 'react';
import { View, FlatList } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';

const itemSize = 317;

export default function TabOneScreen() {
  return (
    <FlashList
      data={articleData}
      renderItem={({ item }) => <ArticleSummaryCard article={item} />}
      estimatedItemSize={itemSize}
      contentContainerStyle={{
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}
    />
  );
}
