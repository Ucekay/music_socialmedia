import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/src/constants/Colors';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import ArticleSummaryCard from '@/src/components/ArticleSummaryCard';
import articleData from '@/src/assets/articleData';
import type { articleDataType } from '@/src/types';

const itemSize = 317;

export default function TabOneScreen() {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();
  const progress = useDerivedValue(() => {
    return colorScheme === 'dark' ? withTiming(1) : withTiming(0);
  }, [colorScheme]);
  const animatedStyle = useAnimatedStyle(() => {
    const backGroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    );
    return {
      backgroundColor: backGroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <FlashList
        data={articleData}
        renderItem={({ item }) => (
          <ArticleSummaryCard article={item as articleDataType} />
        )}
        estimatedItemSize={itemSize}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: tabBarHeight,
          paddingHorizontal: 16,
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
