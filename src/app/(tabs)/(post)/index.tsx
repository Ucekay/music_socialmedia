import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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

import { useState, useEffect } from 'react';
import { createPostDataset } from '@/src/backend/components/Front_connection/Post_Timeline';
import { PostData } from '@/src/types';

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

  const [posts, setPosts] = useState<PostData[]>([]);
  const [cursor, setCursor] = useState<string | null>(null)
  const [latestcursor, setLatestcursor] = useState<string|null>(null)
  const [loading, setLoading] = useState(false);
  
  const fetchPosts = async() => {
    const fetchPosts = await createPostDataset(cursor, null);
    setPosts([...posts, ...fetchPosts.postData])
    setCursor(fetchPosts.cursor)
    setLatestcursor(fetchPosts.latestcursor)
  }

  const fetchOlderPosts = async() => {
    const fetchPosts = await createPostDataset(cursor, false);
    setPosts([...posts, ...fetchPosts.postData])
    setCursor(fetchPosts.cursor)
  }

  const fetchNewPosts = async() => {
    const fetchPosts = await createPostDataset(latestcursor, true);
    setPosts([...posts, ...fetchPosts.postData])
    setLatestcursor(fetchPosts.latestcursor)
  }

  useEffect(() => {
    fetchPosts()
  }, []);


  return (
    <View style={[styles.container, themeContainerStyle]}>
      <FlashList
        data={posts}
        estimatedItemSize={50}
        renderItem={({ item }) => <PostCard {...item} path='/[postId]'/>}
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
          paddingTop: headerHeight,
        }}
        onEndReached={fetchOlderPosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text>:null}
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
