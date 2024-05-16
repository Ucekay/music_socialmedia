
import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView} from 'react-native';
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



import postData from '@/src/assets/postData';
import PostCard from '@/src/components/PostCard';

const PostsScreen = () : JSX.Element => {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === 'dark'
      ? { backgroundColor: Colors.dark.background }
      : { backgroundColor: Colors.light.background };
  return (
    <Animated.View style={[styles.container, themeContainerStyle]}>
    <FlashList
      data={postData}
      renderItem={({ item }) => (
        <PostCard {...item} />
      )}
      contentContainerStyle={{
        paddingBottom: tabBarHeight,
        paddingTop: headerHeight,
      }}
    />
  </Animated.View>
  )
}

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
}
) 