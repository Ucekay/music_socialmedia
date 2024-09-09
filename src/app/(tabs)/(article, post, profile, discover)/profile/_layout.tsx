import { Stack } from 'expo-router';

export default function ArticleStack() {
  return (
    <Stack>
      <Stack.Screen
        name='[userID]'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='(profile-editor)'
        options={{
          headerShown: false,
          presentation: 'modal',
          title: 'Profile Editor',
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
