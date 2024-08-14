import { useTheme } from '@/src/contexts/ColorThemeContext';
import { BlurView } from 'expo-blur';
import { Stack, useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native';

import { TopTabs } from '@/src/layouts/material-top-tabs';

export default function DynamicLayout({ segment }: { segment: string }) {
  const { colors } = useTheme();
  const themedContainerStyle = { backgroundColor: colors.headerBackground };

  switch (segment) {
    case '(feed)':
      return (
        <Stack
          screenOptions={{
            title: 'Feed',
            headerTransparent: true,
            headerStyle: { ...themedContainerStyle },
            headerBackground: () => (
              <BlurView tint='regular' style={StyleSheet.absoluteFill} />
            ),
          }}
        >
          <Stack.Screen
            name='feedScreen'
            options={{
              title: 'Feed',
            }}
          />
        </Stack>
      );
    case '(profile)':
      return (
        <Stack
          screenOptions={{
            title: 'Profile',
            headerTransparent: true,
            headerStyle: { ...themedContainerStyle },
            headerBackground: () => (
              <BlurView tint='regular' style={StyleSheet.absoluteFill} />
            ),
          }}
        >
          <Stack.Screen name='profile/[userID]' />
        </Stack>
      );
  }
}
