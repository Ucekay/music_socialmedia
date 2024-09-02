import { useTheme } from '@/src/contexts/ColorThemeContext';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { BlurEffectTypes } from 'react-native-screens';

export default function DynamicLayout({ segment }: { segment: string }) {
  const { colors } = useTheme();
  const [blurEffect, setBlurEffect] = useState<BlurEffectTypes>(
    'systemUltraThinMaterial'
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setBlurEffect(
        colorScheme === 'dark'
          ? 'systemUltraThinMaterialDark'
          : 'systemUltraThinMaterialLight'
      );
    });
    return () => subscription.remove();
  }, []);

  switch (segment) {
    case '(article)':
      return (
        <Stack
          screenOptions={{
            title: 'Article',
            headerTransparent: true,
            headerBlurEffect: blurEffect,
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
            headerBlurEffect: blurEffect,
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
            headerBlurEffect: blurEffect,
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
            headerBlurEffect: blurEffect,
            headerTintColor: colors.text,
          }}
        >
          <Stack.Screen name='discover' />
        </Stack>
      );
  }
}
