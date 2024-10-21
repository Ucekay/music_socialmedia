import { StyleSheet } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';

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

  return (
    <BgView style={styles.container}>
      <FlashList
        data={[]}
        renderItem={({ item }) => <PostCard post={item} />}
        estimatedItemSize={100}
        contentContainerStyle={{
          paddingBottom: tabBarHeight,
          paddingTop: headerHeight,
        }}
        onEndReachedThreshold={0.5}
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
