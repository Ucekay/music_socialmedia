import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import PostImages from '@/src/components/PostImages';

const PostDetailScreen = () => {
  const queryClient = useQueryClient();
  const { postID } = useLocalSearchParams();
  const posts = queryClient.getQueryData(['posts']);
  const flattenedPosts = useMemo(() => {
    return posts?.pages.flatMap((page) => page.postData) ?? [];
  }, [posts]);
  const selectedPost = useMemo(() => {
    return flattenedPosts.find((post) => post.postID === Number(postID));
  }, [flattenedPosts, postID]);

  if (!selectedPost) {
    return (
      <View>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{selectedPost.postContent}</Text>
      <Text>Posted by: {selectedPost.user}</Text>
      <Text>Likes: {selectedPost.likes}</Text>
      <PostImages imageUrls={selectedPost.ImageUrl} />
    </View>
  );
};

export default PostDetailScreen;
