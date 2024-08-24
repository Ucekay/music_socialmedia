import { useTheme } from '@/src/contexts/ColorThemeContext';
import { BlurView } from 'expo-blur';
import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function DynamicLayout({ segment }: { segment: string }) {
  const { colors } = useTheme();
  const themedContainerStyle = {
    backgroundColor: colors.headerBackground,
  };

  switch (segment) {
    case '(article)':
      return (
        <Stack
          screenOptions={{
            title: 'Article',
            headerTransparent: true,
            headerStyle: { ...themedContainerStyle },
            headerBlurEffect: 'regular',
            //headerBackground: () => (
            //  <BlurView tint='regular' style={StyleSheet.absoluteFill} />
            //),
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen
            name='articles'
            options={{
              title: 'Article',
            }}
          />
          <Stack.Screen name='posts' />
          <Stack.Screen
            name='profile'
            options={{
              title: 'Profile',
            }}
          />
        </Stack>
      );
    case '(post)':
      return (
        <Stack
          screenOptions={{
            title: 'Post',
            headerTransparent: true,
            headerStyle: { ...themedContainerStyle },
            headerBackground: () => (
              <BlurView tint='regular' style={StyleSheet.absoluteFill} />
            ),
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen name='posts' />
          <Stack.Screen
            name='articles'
            options={{
              title: 'Article',
            }}
          />
          <Stack.Screen
            name='profile'
            options={{
              title: 'Profile',
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
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen name='profile' />
        </Stack>
      );
    case '(discover)':
      return (
        <Stack
          screenOptions={{
            title: 'Discover',
            headerTransparent: true,
            headerStyle: { ...themedContainerStyle },
            headerBackground: () => (
              <BlurView tint='regular' style={StyleSheet.absoluteFill} />
            ),
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen name='discover' />
        </Stack>
      );
  }
}
