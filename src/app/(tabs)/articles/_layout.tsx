import { Stack } from 'expo-router';

export default function ArticleStack() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Articles',
          headerTransparent: true,
          headerBlurEffect: 'prominent',
        }}
      />
    </Stack>
  );
}
