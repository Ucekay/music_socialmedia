import { Stack } from 'expo-router';

import { useTheme } from '@/src/contexts/ColorThemeContext';

export default function DynamicLayout({ segment }: { segment: string }) {
  const { colors } = useTheme();

  switch (segment) {
    case '(article)':
      return (
        <Stack
          screenOptions={{
            title: 'Article',
            headerTransparent: true,
            headerBlurEffect: 'regular',
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
            headerBlurEffect: 'regular',
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
            headerBlurEffect: 'regular',
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen name='profile' />
          <Stack.Screen
            name='articles'
            options={{
              title: 'Article',
            }}
          />
          <Stack.Screen
            name='posts'
            options={{
              title: 'Post',
            }}
          />
          <Stack.Screen
            name='playlists/[userID]'
            options={{
              title: 'Playlists',
            }}
          />
          <Stack.Screen
            name='playlist/[playlistID]'
            options={{
              title: 'Playlist',
            }}
          />
        </Stack>
      );
    case '(discover)':
      return (
        <Stack
          screenOptions={{
            title: 'Discover',
            headerTransparent: true,
            headerBlurEffect: 'regular',
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen name='discover' />
        </Stack>
      );
  }
}
