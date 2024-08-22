import { StyleSheet, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import React from 'react';
import { useTheme } from '@/src/contexts/ColorThemeContext';

export default function PostStack() {
  const { colors } = useTheme();
  const themeContainerStyle = { backgroundColor: colors.headerBackground };
  return (
    <Stack>
      <Stack.Screen
        name='[postID]'
        options={{
          title: 'Posts',
          headerTransparent: true,
          headerStyle: { ...themeContainerStyle },
          headerBackground: () => (
            <BlurView tint='regular' style={StyleSheet.absoluteFill} />
          ),
        }}
      />
      <Stack.Screen
        name='reply-editor-modal'
        options={{
          title: 'Reply Editor',
          headerShown: false,
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
