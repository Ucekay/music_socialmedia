import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { BlurView } from 'expo-blur';
import { useColorScheme } from 'react-native';
import Colors from '@/src/constants/Colors';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import React, { useState } from 'react';

export default function ArticleStack() {
  const colorScheme = useColorScheme();
  const progress = useDerivedValue(() => {
    return colorScheme === 'dark' ? withTiming(1) : withTiming(0);
  }, [colorScheme]);
  const animatedStyle = useAnimatedStyle(() => {
    const backGroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.headerBackground, Colors.dark.headerBackground]
    );
    return {
      backgroundColor: backGroundColor,
    };
  });
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Articles',
          headerTransparent: true,
          headerStyle: {},
          headerBackground: () => (
            <BlurView tint='regular' style={StyleSheet.absoluteFill} />
          ),
        }}
      />
    </Stack>
  );
}
