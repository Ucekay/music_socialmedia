import { StyleSheet, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import React from 'react';
import Colors from '@/src/constants/Colors';
import { ProfileStateProvider } from '@/src/contexts/ProfileEditor';

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
    <ProfileStateProvider>
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
    </ProfileStateProvider>
  );
}