import React from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView} from 'react-native';
import { Image } from 'expo-image';
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
import { type PostDataType } from '@/src/types';
import { FontWeight } from '@shopify/react-native-skia';
import PostCard from '@/src/components/PostCard';

const PostsScreen = () : JSX.Element => {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <Animated.View style={styles.container}>
    <FlashList
      data={postData}
      renderItem={({ item }) => (
        <PostCard {...item} />
      )}
      contentContainerStyle={{
        paddingBottom: tabBarHeight
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