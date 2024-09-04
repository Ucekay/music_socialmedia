import { useTheme } from '@/src/contexts/ColorThemeContext';
import { Stack } from 'expo-router';

export default function DynamicLayout({ segment }: { segment: string }) {
  const { colors } = useTheme();

  switch (segment) {
    case '(article)':
      return (
        <Stack
          screenOptions={{
            title: 'Article',
            headerTransparent: true,
            headerBlurEffect: 'systemUltraThinMaterial',
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
            headerBlurEffect: 'systemUltraThinMaterial',
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
            headerBlurEffect: 'systemUltraThinMaterial',
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
            headerBlurEffect: 'systemUltraThinMaterial',
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen name='discover' />
        </Stack>
      );
  }
}
