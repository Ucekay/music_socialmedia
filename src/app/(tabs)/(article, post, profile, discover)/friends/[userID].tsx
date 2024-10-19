import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
  type Falsy,
  Pressable,
  type RecursiveArray,
  type RegisteredStyle,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
  useColorScheme,
} from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import { Image } from 'expo-image';
import {
  type MaterialTabItemProps,
  type TabBarProps,
  Tabs,
} from 'react-native-collapsible-tab-view';
import { MaterialTabBar } from 'react-native-collapsible-tab-view';

import { getFollowers, getFollowings } from '@/src/backend/supabase_api/handler/user';
import { ProfileMeta } from '@/src/backend/supabase_api/model/user';
import BgView from '@/src/components/ThemedBgView';
import { useTheme } from '@/src/contexts/ColorThemeContext';

import type { AnimatedStyle } from 'react-native-reanimated';

const backgroundColors = [
  ['#F0F0F0', '#2E2E2E'],
  ['#D3D3D3', '#444444'],
  ['#FFE4B5', '#555555'],
  ['#ADD8E6', '#3B3B3B'],
  ['#FFF0F5', '#4A4A4A'],
];

const FollowingUserCard = (props: ProfileMeta): JSX.Element => {
  const [followingStatus, setFollowingStatus] = useState(true); //初期値は毎度検証したものを入力してください
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const TagColor =
    colorScheme === 'light' ? backgroundColors[0][0] : backgroundColors[0][1];

  const textColor = colors.text;

  const router = useRouter();

  const HandleUnfollow = () => {
    setFollowingStatus(false);
  };

  const HandleFollow = () => {
    setFollowingStatus(true);
  };

  const HandleUser = () => {
    router.push(`/profile/${props.userId}`);
  }

  return (
    <BgView style={styles.container}>
      <Pressable style={{alignItems: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}} onPress={HandleUser}>
      <View style={styles.userInfoContainer}>
        <Image source={props.iconImageUrl} style={styles.userAvatar} />
        <View>
          <Text style={styles.userId}>{props.profileId}</Text>
          <Text style={styles.userName}>{props.userName}</Text>
        </View>
      </View>
      {followingStatus ? (
        <Pressable onPress={HandleUnfollow} style={{ height: 30 }}>
          <View style={[styles.button, { backgroundColor: TagColor }]}>
            <Text style={[styles.text, { color: textColor }]}>フォロー中</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable onPress={HandleFollow} style={{ height: 30 }}>
          <View style={[styles.button, { backgroundColor: '#2f95dc' }]}>
            <Text style={[styles.text, { color: '#ffffff' }]}>フォロー</Text>
          </View>
        </Pressable>
        )}
      </Pressable>
    </BgView>
  );
};

const FollowerUserCard = (props: ProfileMeta): JSX.Element => {
  const [followedStatus, setFollowedStatus] = useState(true); //初期値は毎度検証したものを入力してください
  const colorScheme = useColorScheme();
  const TagColor =
    colorScheme === 'light' ? backgroundColors[0][0] : backgroundColors[0][1];

  const textColor = colorScheme === 'light' ? '#000000' : '#ffffff';

  const HandleDelete = () => {
    setFollowedStatus(false);
  };

  return (
    <BgView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image source={props.iconImageUrl} style={styles.userAvatar} />
        <View>
          <Text style={styles.userId}>{props.profileId}</Text>
          <Text style={styles.userName}>{props.userName}</Text>
        </View>
      </View>
      {followedStatus ? (
        <Pressable onPress={HandleDelete} style={{ height: 30 }}>
          <View style={[styles.button, { backgroundColor: TagColor }]}>
            <Text style={[styles.text, { color: textColor }]}>削除</Text>
          </View>
        </Pressable>
      ) : null}
    </BgView>
  );
};

const UserListScreen = (): JSX.Element => {
  const { userID, initialTab } = useLocalSearchParams();
  let initialTabName: string;
  if (typeof initialTab === 'string') {
    initialTabName = initialTab;
  } else {
    initialTabName = 'follower';
  }

  let userIdStr: string;
  if (typeof userID !== 'string') {
    userIdStr = '123e4567-e89b-12d3-a456-426614174001';
  } else {
    userIdStr = userID;
  };

  const [followerData, setFollowerData] = useState<ProfileMeta[]>([]);
  const [followingData, setFollowingData] = useState<ProfileMeta[]>([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try{
        const followerData = await getFollowers(userIdStr);
        const followingData = await getFollowings(userIdStr);

        setFollowerData(followerData);
        setFollowingData(followingData);
      } catch (error) {
        console.error('ユーザーリストの取得中にエラーが発生しました:', error);
      }
    };

    fetchUserList();
  }, []);

  const tabBarHeight = useBottomTabBarHeight();
  const headerHeight = useHeaderHeight();

  const colorScheme = useColorScheme();

  const backGroundColor = colorScheme === 'dark' ? '#000000' : '#ffffff';

  const textColor = colorScheme === 'light' ? '#000000' : '#ffffff';

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
  ) => (
    <MaterialTabBar
      {...props}
      indicatorStyle={{ backgroundColor: textColor }}
      style={{
        backgroundColor: backGroundColor,
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        height: 50,
      }}
      labelStyle={{
        color: textColor,
        fontSize: 16,
      }}
    />
  );

  return (
    <BgView style={{ flex: 1, marginTop: headerHeight }}>
      <Tabs.Container
        initialTabName={initialTabName}
        renderTabBar={renderTabBar}
      >
        <Tabs.Tab name='follower' label='follower'>
          <Tabs.FlashList
            data={followerData}
            renderItem={({ item }) => (
              <View>
                <FollowerUserCard {...item} />
              </View>
            )}
            estimatedItemSize={70}
            contentContainerStyle={{
              backgroundColor: backGroundColor,
              paddingBottom: tabBarHeight,
              paddingVertical: 16,
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab name='following' label='following'>
          <Tabs.FlashList
            data={followingData}
            renderItem={({ item }) => (
              <View>
                <FollowingUserCard {...item} />
              </View>
            )}
            estimatedItemSize={70}
            contentContainerStyle={{
              backgroundColor: backGroundColor,
              paddingBottom: tabBarHeight,
              paddingVertical: 16,
            }}
          />
        </Tabs.Tab>
      </Tabs.Container>
    </BgView>
  );
};

export default UserListScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    paddingVertical: 4,
  },
  userInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userAvatar: {
    width: 45,
    height: 45,
    marginRight: 16,
    borderRadius: 25,
  },
  userId: {
    fontSize: 14,
    fontWeight: '500',
  },
  userName: {
    fontSize: 13,
    color: '#696969',
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: 100,
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  tabBar: {
    height: 50,
    backgroundColor: '#ffffff',
  },
  indicator: {
    backgroundColor: '#000000',
  },
});
