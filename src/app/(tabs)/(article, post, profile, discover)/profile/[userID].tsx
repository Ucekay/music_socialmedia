import { Stack, useLocalSearchParams } from 'expo-router';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
  type Falsy,
  type RecursiveArray,
  type RegisteredStyle,
  type StyleProp,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import {
  MaterialTabBar,
  type MaterialTabItemProps,
  type TabBarProps,
  Tabs,
} from 'react-native-collapsible-tab-view';

import userArticleData from '@/src/assets/userArticleData';
import { GetUserProfile } from '@/src/backend/supabase_apis/handler/user';
import ArticleCard from '@/src/components/ArticleCard';
import PostCard from '@/src/components/PostCard';
import BgView from '@/src/components/ThemedBgView';
import UserProfileTop from '@/src/components/UserProfileTop';
import LoginUserProfileTop from '@/src/components/UserProfileTopOfLoginUser';
import { useTheme } from '@/src/contexts/ColorThemeContext';

import postData from '../../../../assets/postData';

import type { Profile as UserProfile } from '../../../../backend/supabase_apis/model/user';
import type { ArticleData } from '@/src/types';
import type { AnimatedStyle } from 'react-native-reanimated';

const Profile = () => {
  const { userID } = useLocalSearchParams();
  const { colors } = useTheme();

  const [profile, setProfile] = useState<UserProfile>({
    bio: '',
    follow: 0,
    followed: 0,
    iconImageUrl: '',
    profileId: '',
    userId: '',
    userName: '',
    favArtists: [],
  });

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        if (typeof userID === 'string') {
          if (userID){
            const profileData = await GetUserProfile(userID);
            console.log(profileData);
            setProfile(profileData);
          } 
        } else {
            const profileData = await GetUserProfile('123e4567-e89b-12d3-a456-426614174001');
            console.log(profileData);
            setProfile(profileData);
          }
        } catch (error) {
        console.log(error);
      }
    };

    getUserProfile();
  },[])

  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();

  const backGroundColor = colors.background;

  const textColor = colors.text;

  const itemSize = userID ? 320 : 250;

  const renderTabBar = (
    props: React.JSX.IntrinsicAttributes &
      TabBarProps<string> & {
        scrollEnabled?: boolean | undefined;
        indicatorStyle?:
          | Falsy
          | AnimatedStyle<ViewStyle>
          | RegisteredStyle<AnimatedStyle<ViewStyle>>
          | RecursiveArray<
              | Falsy
              | AnimatedStyle<ViewStyle>
              | RegisteredStyle<AnimatedStyle<ViewStyle>>
            >;
        TabItemComponent?:
          | ((
              props: MaterialTabItemProps<string>,
            ) => React.ReactElement<
              React.ReactElement,
              string | React.JSXElementConstructor<JSX.Element>
            >)
          | undefined;
        getLabelText?: ((name: string) => string) | undefined;
        style?: StyleProp<ViewStyle>;
        contentContainerStyle?: StyleProp<ViewStyle>;
        tabStyle?: StyleProp<ViewStyle>;
        labelStyle?:
          | Falsy
          | AnimatedStyle<TextStyle>
          | RegisteredStyle<AnimatedStyle<TextStyle>>
          | RecursiveArray<
              | Falsy
              | AnimatedStyle<TextStyle>
              | RegisteredStyle<AnimatedStyle<TextStyle>>
            >;
        activeColor?: string | undefined;
        inactiveColor?: string | undefined;
        keepActiveTabCentered?: boolean | undefined;
      },
  ) => {
    return (
      <MaterialTabBar
        {...props}
        indicatorStyle={{ backgroundColor: textColor }}
        labelStyle={{ color: textColor }}
        style={{
          backgroundColor: backGroundColor,
        }}
      />
    );
  };

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
          userID ? <UserProfileTop {...profile} /> : <LoginUserProfileTop {...profile} />
        }
        renderTabBar={renderTabBar}
      >
        <Tabs.Tab name='post' label='Post'>
          <Tabs.FlashList
            data={postData}
            renderItem={({ item }) => (
              <BgView>
                <PostCard post={item} />
              </BgView>
            )}
            estimatedItemSize={150}
            contentContainerStyle={{
              backgroundColor: backGroundColor,
              paddingBottom: tabBarHeight,
              paddingVertical: 16,
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
