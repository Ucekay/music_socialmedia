import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

const articleDetailsScreen = () => {
  const { articleID } = useLocalSearchParams();
  return (
    <View>
      <Text>article ID: {articleID}</Text>
    </View>
  );
};

export default articleDetailsScreen;
