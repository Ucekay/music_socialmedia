import { StyleSheet, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import React from 'react';
import Colors from '@/src/constants/Colors';

export default function ArticleStack() {
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'dark'
      ? {
          backgroundColor: Colors['dark'].headerBackground,
        }
      : {
          backgroundColor: Colors['light'].headerBackground,
        };
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Profile',
          headerStyle: { ...themeContainerStyle },
          headerBackground: () => (
            <BlurView tint='regular' style={StyleSheet.absoluteFill} />
          ),
        }}
      />
<<<<<<<< HEAD:src/app/(tabs)/profile/_layout.tsx
      <Stack.Screen
        name='(profile-editor)'
        options={{
          headerShown: false,
          presentation: 'modal',
          title: 'Profile Editor',
          gestureEnabled: false,
        }}
      />
========
>>>>>>>> 3f24f6078283677cde970c666613f0bceed6a11d:src/app/(tabs)/(post)/_layout.tsx
    </Stack>
  );
}