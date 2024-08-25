import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import {
  View,
  Falsy,
  RecursiveArray,
  RegisteredStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import LoginUserProfileTop from '@/src/components/UserProfileTopOfLoginUser';
import {
  Tabs,
  MaterialTabBar,
  MaterialTabItemProps,
  TabBarProps,
} from 'react-native-collapsible-tab-view';
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
import { AnimatedStyle } from 'react-native-reanimated';

const Profile = () => {
  const { userID } = useLocalSearchParams();
  const { colors } = useTheme();

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
              props: MaterialTabItemProps<string>
            ) => React.ReactElement<
              any,
              string | React.JSXElementConstructor<any>
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
      }
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
          userID ? <UserProfileTop /> : <LoginUserProfileTop id={'@Taro1234'} />
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
