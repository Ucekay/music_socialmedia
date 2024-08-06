import React from 'react';
import { useFocusEffect } from 'expo-router';
import {View, StyleSheet} from 'react-native'
import LoginUserProfileTop from '@/src/components/UserProfileTopOfLoginUser';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import { Tabs } from 'react-native-collapsible-tab-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PostCard from '@/src/components/PostCard';
import ArticleCard from '@/src/components/ArticleCard';
import { articleDataType } from '@/src/types';
import postData from '@/src/assets/postData';
import userArticleData from '@/src/assets/userArtickeData';

const TEXT_HEIGHT = 65.7;
const HEADER_HEIGHT = 199;
const itemSize = 320;

const LoginProfileScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { setActionVisible } = useTabAction();
  const { setProfileDismissed } = useProfileScreen();
  useFocusEffect(
    React.useCallback(() => {
      setProfileDismissed(true);
      return () => {
        setActionVisible(false);
      };
    }, [])
  );
  return (
      <Tabs.Container
        headerHeight={HEADER_HEIGHT}
        renderHeader={() => <LoginUserProfileTop id='@Taro1234'/>}
      >
        <Tabs.Tab name='post' label='Post'>
          <Tabs.FlashList
            data={postData}
            renderItem={({ item }) => (
              <View>
                <PostCard {...item} path='/(tabs)/profile/(post)/[postId]'/>
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
  export default LoginProfileScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  