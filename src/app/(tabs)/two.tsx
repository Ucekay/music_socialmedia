import React from 'react';
import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';
import type { articleDataType } from '@/src/types';

const articles = articleData;

export default function TabTwoScreen(articles: articleDataType[]) {
  const article1: articleDataType = articleData[0];
  console.log(articles);
  console.log(article1);
  return <ArticleSummaryCard article={article1} />;
}
