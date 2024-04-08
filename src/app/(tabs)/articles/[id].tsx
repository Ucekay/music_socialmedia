import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

const ArticleDetailScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Article Detail Screen : {id}</Text>
    </View>
  );
};

export default ArticleDetailScreen;
