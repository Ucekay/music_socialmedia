import React from 'react';
import { FlatList } from 'react-native';
import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';
import type { articleDataType } from '@/src/types';

export default function TabTwoScreen() {
  const article1 = articleData[0];
  console.log(article1);
  return (
    <FlatList
      data={articleData}
      renderItem={({ item }) => <ArticleSummaryCard article={item} />}
      keyExtractor={(item: articleDataType) => item.articleID}
      contentContainerStyle={{ padding: 16 }}
    />
  );
}
