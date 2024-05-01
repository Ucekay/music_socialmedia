import { StyleSheet, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import React from 'react';
import Colors from '@/src/constants/Colors';

export default function ArticleStack() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'dark'
      ? { backgroundColor: Colors['dark'].headerBackground }
      : { backgroundColor: Colors['light'].headerBackground };
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Articles',
          headerTransparent: true,
          headerStyle: { ...themeContainerStyle },
          headerBackground: () => (
            <BlurView tint='regular' style={StyleSheet.absoluteFill} />
          ),
        }}
      />
    </Stack>
  );
}
