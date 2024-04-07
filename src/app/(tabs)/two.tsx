import React from 'react';
import { FlatList } from 'react-native';
import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';
import type { articleDataType } from '@/src/types';
import { View } from '@/src/components/Themed';

const articles = articleData;

export default function TabTwoScreen(articles: articleDataType[]) {
  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => <ArticleSummaryCard article={item} />}
      keyExtractor={(item) => item.articleID}
    />
  );
}
