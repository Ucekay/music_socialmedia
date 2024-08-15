import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const ArticleDetailsScreen = () => {
  const { articleID } = useLocalSearchParams();
  return (
    <View>
      <Text>article ID: {articleID}</Text>
    </View>
  );
};

export default ArticleDetailsScreen;
