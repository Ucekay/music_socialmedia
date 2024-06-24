import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Link, useFocusEffect } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  useAnimatedProps,
} from 'react-native-reanimated';

import Colors from '@/src/constants/Colors';
import ArticleCard from '@/src/components/ArticleCard';
import TabActionMenu from '@/src/components/TabActionMenu';
import articleData from '@/src/assets/articleData';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import type { articleDataType } from '@/src/types';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';
import { useTabsSwipeOffset } from '@/src/contexts/TabsSwipeOffsetContext';
import { BlurView } from 'expo-blur';

const itemSize = 308;
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function TabOneScreen() {
  useFocusEffect(
    React.useCallback(() => {
      setProfileDismissed(false);
      return () => {
        setActionVisible(false);
      };
    }, [])
  );

  const { tabsSwipeOffset } = useTabsSwipeOffset();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { actionVisible, setActionVisible } = useTabAction();
  const { setProfileDismissed } = useProfileScreen();
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'dark'
      ? { backgroundColor: Colors.dark.background }
      : { backgroundColor: Colors.light.background };

  const intensity = useSharedValue(1);
  intensity.value = interpolate(
    Math.abs(tabsSwipeOffset),
    [0, 34, 0],
    [0, 25, 25]
  );
  const animatedIntensity = useAnimatedProps(() => {
    return {
      intensity: intensity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, themeContainerStyle]}>
      <FlashList
        data={articleData}
        renderItem={({ item }) => (
          <ArticleCard article={item as articleDataType} />
        )}
        estimatedItemSize={itemSize}
        contentContainerStyle={{
          paddingTop: headerHeight,
          paddingBottom: tabBarHeight,
          paddingHorizontal: 20,
        }}
      />
      <AnimatedBlurView
        tint={
          colorScheme === 'dark'
            ? 'systemThinMaterialDark'
            : 'systemThinMaterialLight'
        }
        animatedProps={animatedIntensity}
        style={StyleSheet.absoluteFill}
      />
      <TabActionMenu />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  Bg: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    zIndex: 100,
    backgroundColor: 'red',
  },
});
