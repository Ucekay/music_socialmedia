import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import UserProfileTop from '@/src/components/UserProfileTop';
import userArticleData from '@/src/assets/userArticleData';
import ArticleCard from '@/src/components/ArticleCard';
import { useLocalSearchParams, Stack, useFocusEffect } from 'expo-router';
import { useHeaderHeight } from '@react-navigation/elements';
import UserProfileTopOfLoginUser from '@/src/components/UserProfileTopOfLoginUser';
import { ArticleData } from '@/src/types';
import userData from '@/src/assets/userData';
import TabActionMenu from '@/src/components/TabActionMenu';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';
import BgView from '@/src/components/ThemedBgView';
import postData from '@/src/assets/postData';
import PostCard from '@/src/components/PostCard';

const TEXT_HEIGHT = 65.7;
const HEADER_HEIGHT = 199;
const itemSize = 320;

const Profile = () => {
  const { userID } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <Tabs.Container
      headerHeight={HEADER_HEIGHT}
      renderHeader={() => <UserProfileTop />}
    >
      <Tabs.Tab name='post' label='Post'>
        <Tabs.FlashList
          data={postData}
          renderItem={({ item }) => (
            <View>
              <PostCard {...item}/>
            </View>
          )}
          estimatedItemSize={TEXT_HEIGHT}
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingBottom: tabBarHeight,
            paddingVertical: 16
          }}
        />
      </Tabs.Tab>
      <Tabs.Tab name='article' label='Article'>
        <Tabs.FlashList
          data={userArticleData}
          renderItem={({ item }) => (
            <ArticleCard article={item as articleDataType} />
          )}
          estimatedItemSize={itemSize}
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingBottom: tabBarHeight,
            paddingHorizontal: 16,
          }}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
};
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
