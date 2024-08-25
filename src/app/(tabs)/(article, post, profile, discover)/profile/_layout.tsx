import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from '@/src/contexts/ColorThemeContext';

export default function ArticleStack() {
  const { colors } = useTheme();

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
