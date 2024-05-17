import React, { useContext, useEffect, useRef } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';

import Colors from '@/src/constants/Colors';
import ArticleCard from '@/src/components/ArticleCard';
import articleData from '@/src/assets/articleData';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import type { articleDataType } from '@/src/types';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';

const itemSize = 308;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TabOneScreen() {
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setActionVisible(false);
      };
    }, [])
  );

  const { width, height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { actionVisible, setActionVisible } = useTabAction();
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'dark'
      ? { backgroundColor: Colors.dark.background }
      : { backgroundColor: Colors.light.background };

  const handlePress = () => {
    setActionVisible(false);
  };

  const actionContainerHeight = useSharedValue(0);
  const actionContainerWidth = useSharedValue(0);
  const actionContainerOpacity = useSharedValue(0);
  const actionBackgroundColor = useSharedValue('rgba(0, 0, 0, 0)');

  actionContainerHeight.value = withTiming(actionVisible ? 200 : 0, {
    duration: 300,
  });
  actionContainerWidth.value = withTiming(actionVisible ? 150 : 0, {
    duration: 300,
  });
  actionContainerOpacity.value = withTiming(actionVisible ? 1 : 0, {
    duration: 300,
  });
  actionBackgroundColor.value = withTiming(
    actionVisible ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)',
    {
      duration: 300,
    }
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      height: actionContainerHeight.value,
      width: actionContainerWidth.value,
      bottom: tabBarHeight + 12,
      opacity: actionContainerOpacity.value,
    };
  });
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: actionBackgroundColor.value,
    };
  });

  return (
    <View style={[styles.container, themeContainerStyle]}>
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
      {actionVisible && (
        <AnimatedPressable
          onPress={handlePress}
          entering={FadeIn}
          exiting={FadeOut}
          style={[animatedBackgroundStyle, styles.actionBackground, { height }]}
        />
      )}
      <Animated.View style={[animatedContainerStyle, styles.actionContainer]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 100,
  },
  actionContainer: {
    width: '20%',
    position: 'absolute',
    right: 16,
    zIndex: 100,
    backgroundColor: 'red',
  },
});
