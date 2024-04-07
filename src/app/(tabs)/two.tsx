import React from 'react';
import { FlatList } from 'react-native';
import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';

export default function TabTwoScreen() {
  return (
    <FlatList
      data={articleData}
      renderItem={({ item }) => <ArticleSummaryCard article={item} />}
      keyExtractor={(item) => item.articleID}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}
