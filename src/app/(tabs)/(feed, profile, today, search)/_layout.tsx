import { Stack, useNavigation } from 'expo-router';
import { Text } from 'react-native';

export default function DynamicLayout({ segment }: { segment: string }) {
  const navigation = useNavigation(); // Add this line to get the navigation object

  switch (segment) {
    case '(feed)':
      return (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='postsScreen' />
          <Stack.Screen name='articlesScreen' />
          <Stack.Screen name='profileScreen' />
        </Stack>
      );
    case '(profile)':
      return (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='profileScreen' />
        </Stack>
      );
  }
}
