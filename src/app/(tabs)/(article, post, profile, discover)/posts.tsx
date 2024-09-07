import { useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';

import { FlashList } from '@shopify/flash-list';
import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { createPostDataset } from '@/src/backend/components/Front_connection/post_timeline';
import PostCard from '@/src/components/PostCard';
import BgView from '@/src/components/ThemedBgView';

import type { PostData } from '@/src/types';

interface FetchPostsParams {
  cursor: string | null;
  isForward: boolean | null;
}

interface PostsResult {
  postData: PostData[];
  cursor: string | null;
  latestcursor: string | null;
}

const postsScreen = () => {
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    status,
  } = useInfiniteQuery<
    PostsResult,
    Error,
    InfiniteData<PostsResult>,
    string[],
    FetchPostsParams
  >({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => createPostDataset(pageParam),
    getNextPageParam: (lastPage) =>
      lastPage.cursor
        ? { cursor: lastPage.cursor, isForward: false }
        : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.latestcursor
        ? { cursor: firstPage.latestcursor, isForward: true }
        : undefined,
    initialPageParam: { cursor: null, isForward: null },
  });

  const flattenedData = useMemo(() => {
    return data?.pages.flatMap((page) => page.postData) ?? [];
  }, [data]);

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <BgView style={styles.container}>
      <FlashList
        data={flattenedData}
        renderItem={({ item }) => <PostCard post={item} />}
        estimatedItemSize={100}
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
          paddingTop: headerHeight,
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <Text>Loading...</Text> : null
        }
      />
    </BgView>
  );
};

export default postsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
