import { StyleSheet, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import React from 'react';
import { useTheme } from '@/src/contexts/ColorThemeContext';

export default function ArticleStack() {
  const { colors } = useTheme();
  const themeContainerStyle = { backgroundColor: colors.headerBackground };

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
