import React from 'react';
import { useFocusEffect } from 'expo-router';
import {View, StyleSheet, useColorScheme} from 'react-native'
import LoginUserProfileTop from '@/src/components/UserProfileTopOfLoginUser';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';
import { useTabAction } from '@/src/contexts/ActionButtonContext';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PostCard from '@/src/components/PostCard';
import ArticleCard from '@/src/components/ArticleCard';
import { articleDataType } from '@/src/types';
import postData from '@/src/assets/postData';
import userArticleData from '@/src/assets/userArticleData';
import BgView from '@/src/components/ThemedBgView';

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

  const colorScheme = useColorScheme();

  const backGroundColor = 
  colorScheme === 'dark'
  ? '#000000'
  : '#ffffff'

  const textColor = 
  colorScheme === 'light'
  ? '#000000'
  : '#ffffff'

  const renderTabBar = (props) => {
    return(
    <MaterialTabBar
      {...props}
      indicatorStyle={{ backgroundColor: textColor}}
      labelStyle={{color: textColor}}
      style={{
        backgroundColor: backGroundColor
      }}
    />
    )
    }

  return (
      <Tabs.Container
        headerHeight={HEADER_HEIGHT}
        renderHeader={() => <LoginUserProfileTop id='@RamenKing88'/>}
        renderTabBar={renderTabBar}
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
              backgroundColor: backGroundColor,
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
              backgroundColor: backGroundColor,
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
  
