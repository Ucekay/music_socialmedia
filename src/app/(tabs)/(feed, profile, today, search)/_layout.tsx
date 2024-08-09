import { Stack } from 'expo-router';

export default function DynamicLayout({ segment }: { segment: string }) {
  return (
    <Stack>
      <Stack.Screen name='postsScreen' />
      <Stack.Screen name='articlesScreen' />
    </Stack>
  );
}
