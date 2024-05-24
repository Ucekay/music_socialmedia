import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '@/src/constants/Colors';

import postData from '@/src/assets/postData';
import PostCard from '@/src/components/PostCard';
import TabActionMenuList from '@/src/components/TabActionMenuList';
import TabActionMenu from '@/src/components/TabActionMenu';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';

const PostsScreen = (): JSX.Element => {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const colorScheme = useColorScheme();
  const { setActionVisible } = useTabAction();
  const { setProfileDismissed } = useProfileScreen();
  useFocusEffect(
    React.useCallback(() => {
      setProfileDismissed(false);
      return () => {
        setActionVisible(false);
      };
    }, [])
  );
  const themeContainerStyle =
    colorScheme === 'dark'
      ? { backgroundColor: Colors.dark.background }
      : { backgroundColor: Colors.light.background };
  return (
    <View style={[styles.container, themeContainerStyle]}>
      <FlashList
        data={postData}
        estimatedItemSize={50}
        renderItem={({ item }) => <PostCard {...item} />}
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
          paddingTop: headerHeight,
        }}
      />
      <TabActionMenu />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
