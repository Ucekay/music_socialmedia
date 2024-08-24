import React from 'react';
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, useColorScheme } from 'react-native'
import LoginUserProfileTop from '@/src/components/UserProfileTopOfLoginUser';
import { useProfileScreen } from '@/src/contexts/ProfileScreenContext';
import { Tabs, MaterialTabBar } from 'react-native-collapsible-tab-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PostCard from '@/src/components/PostCard';
import ArticleCard from '@/src/components/ArticleCard';
import postData from '@/src/assets/postData';
import userArticleData from '@/src/assets/userArticleData';
import BgView from '@/src/components/ThemedBgView';
import UserProfileTop from '@/src/components/UserProfileTop';
import { ArticleData } from '@/src/types';
import { useHeaderHeight } from '@react-navigation/elements';
import { useTheme } from '@/src/contexts/ColorThemeContext';

const TEXT_HEIGHT = 65.7;
const itemSize = 320;

const Profile = () => {
  const { userID } = useLocalSearchParams();
  const {colors} = useTheme();

  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { setProfileDismissed } = useProfileScreen();;

  const colorScheme = useColorScheme();

  const backGroundColor = colors.background;

  const textColor = colors.text

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
    <View style={{ flex: 1, paddingTop: headerHeight }}>
      <Stack.Screen
        options={{
          title: 'Profile',
        }}
      />
    <Tabs.Container
    headerHeight={headerHeight}
    renderHeader={() =>
      userID ? (
        <UserProfileTop />
      ) : (
        <LoginUserProfileTop id={'@Taro1234'} />
      )
    }
    renderTabBar={renderTabBar}
    >
        <Tabs.Tab name='post' label='Post'>
          <Tabs.FlashList
            data={postData}
            renderItem={({ item }) => (
              <BgView>
                <PostCard post={item}/>
              </BgView>
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
              <ArticleCard article={item as ArticleData} />
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
      </View>
    );
  };
  export default Profile;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  