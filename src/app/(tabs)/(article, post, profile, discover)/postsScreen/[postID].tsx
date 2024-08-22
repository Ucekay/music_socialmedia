import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Href, Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import { useHeaderHeight } from '@react-navigation/elements';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ChatBubbleEmpty } from 'iconoir-react-native';

import { useTheme } from '@/src/contexts/ColorThemeContext';
import PostImages from '@/src/components/PostImages';
import BgView from '@/src/components/ThemedBgView';
import Text from '@/src/components/ThemedText';
import { formatCreatedAt } from '@/src/utils/date/formatCreatedAt';
import HeartIcon from '@/src/components/Icons/HeartIcon';
import ShareIcon from '@/src/components/Icons/ShareIcon';

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
  const themedBorderColor = { borderColor: colors.border };

  if (!selectedPost) {
    return (
      <View>
        <Text>Post not found</Text>
      </View>
    );
  }

  const { formattedDate, formattedTime } = formatCreatedAt(
    selectedPost.createdAt
  );

  return (
    <BgView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Post',
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
          paddingBottom: 16 + tabBarHeight,
          marginTop: headerHeight,
        }}
      >
        <BgView style={styles.container}>
          <Link href={`/profile/${selectedPost.userID}`} asChild>
            <Pressable style={styles.user}>
              <Image
                style={styles.userAvatar}
                source={selectedPost.userAvatarUrl}
              />
              <View>
                <Text style={styles.userName}>{selectedPost.user}</Text>
                <Text style={themedTextColor}>@{selectedPost.userID}</Text>
              </View>
            </Pressable>
          </Link>
          <Text style={styles.content}>{selectedPost.postContent}</Text>
          <PostImages imageUrls={selectedPost.ImageUrl} />
          <View>
            <View style={[styles.infoContainer, themedBorderColor]}>
              <Text style={[styles.info, themedTextColor]}>
                {formattedDate} {formattedTime}
              </Text>
            </View>
            <View style={[styles.infoContainer, themedBorderColor]}>
              <Text style={styles.highlighted}>{selectedPost.likes}</Text>
              <Text style={[styles.info, themedTextColor]}>件のいいね</Text>
            </View>
          </View>
          <View style={styles.iconsContainer}>
            <HeartIcon width={20} height={20} isPost id={selectedPost.postID} />
            <ChatBubbleEmpty
              width={20}
              height={20}
              color={colors.secondaryText}
            />
            <ShareIcon width={20} height={20} />
          </View>
          <View style={{ height: tabBarHeight }} />
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 32,
    borderBottomWidth: 0.5,
  },
  info: {},
  highlighted: {
    fontWeight: '500',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 24,
  },
});
