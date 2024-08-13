import { View, StyleSheet, ScrollView } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import PostImages from '@/src/components/PostImages';
import BgView from '@/src/components/ThemedBgView';
import Text from '@/src/components/ThemedText';
import { Image } from 'expo-image';
import { useTheme } from '@/src/contexts/ColorThemeContext';
import { BlurView } from 'expo-blur';
import { useHeaderHeight } from '@react-navigation/elements';

const PostDetailScreen = () => {
  const { colors } = useTheme();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const queryClient = useQueryClient();
  const { postID } = useLocalSearchParams();
  const posts = queryClient.getQueryData(['posts']);
  const flattenedPosts = useMemo(() => {
    return posts?.pages.flatMap((page) => page.postData) ?? [];
  }, [posts]);
  const selectedPost = useMemo(() => {
    return flattenedPosts.find((post) => post.postID === Number(postID));
  }, [flattenedPosts, postID]);

  const themeContainerStyle = { backgroundColor: colors.headerBackground };
  const themedTextColor = { color: colors.secondaryText };

  if (!selectedPost) {
    return (
      <View>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <BgView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Posts',
          headerTransparent: true,
          headerStyle: { ...themeContainerStyle },
          headerBackground: () => (
            <BlurView tint='regular' style={StyleSheet.absoluteFill} />
          ),
        }}
      />
      <ScrollView
        style={{
          flex: 1,
          paddingBottom: 16,
          paddingTop: headerHeight,
          marginBottom: tabBarHeight,
        }}
      >
        <BgView style={styles.container}>
          <View style={styles.user}>
            <Image
              style={styles.userAvatar}
              source={selectedPost.userAvatarUrl}
            />
            <View>
              <Text style={styles.userName}>{selectedPost.user}</Text>
              <Text style={themedTextColor}>@{selectedPost.userID}</Text>
            </View>
          </View>
          <Text style={styles.content}>{selectedPost.postContent}</Text>
          <PostImages imageUrls={selectedPost.ImageUrl} />
          <View style={styles.infoContainer}>
            <Text style={styles.info}>{selectedPost.createdAt}</Text>
          </View>
        </BgView>
      </ScrollView>
    </BgView>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  user: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 8,
    alignItems: 'center',
  },
  userAvatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    fontSize: 16,
  },
  infoContainer: {
    height: 32,
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  info: {},
});
