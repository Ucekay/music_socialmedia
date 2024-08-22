import BgView from "@/src/components/ThemedBgView";
import { UserListType } from "@/src/types";
import React, { useState } from "react";
import { 
    View,
    Text, 
    StyleSheet,
    Dimensions,
    useColorScheme,
    Pressable
 } from "react-native";
import { Image } from "expo-image";
import { Tabs } from "react-native-collapsible-tab-view";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import userData from "@/src/assets/userData";
import { useLocalSearchParams } from "expo-router";
import { MaterialTabBar } from "react-native-collapsible-tab-view";
import Colors from "@/src/constants/Colors";

const width = Dimensions.get('window').width
const backgroundColors = [
    ["#F0F0F0", "#2E2E2E"],
    ["#D3D3D3", "#444444"],
    ["#FFE4B5", "#555555"],
    ["#ADD8E6", "#3B3B3B"],
    ["#FFF0F5", "#4A4A4A"]
  ];

const FollowingUserCard = (props: UserListType): JSX.Element => {
  const [followingStatus, setFollowingStatus] = useState(true) //初期値は毎度検証したものを入力してください
  const colorScheme = useColorScheme();
  const TagColor =
  colorScheme === 'light'
  ? backgroundColors[0][0]
  : backgroundColors[0][1]

  const textColor = 
  colorScheme === 'light'
  ? '#000000'
  : '#ffffff'

  const themeTextColor = {
    color: Colors[colorScheme ?? 'light'].text,
  };

  const HandleUnfollow = () => {
    setFollowingStatus(false)
  }

  const HandleFollow = () => {
    setFollowingStatus(true)
  }

    return(
        <BgView style={styles.container}>
            <View style={styles.userInfoContainer}>
                <Image source={props.userAvatarUrl} style={styles.userAvatar}/>
                <View>
                    <Text style={styles.userId}>{props.userID}</Text>
                    <Text style={styles.userName}>{props.userName}</Text>
                </View>
            </View>
            {followingStatus 
            ? (
            <Pressable onPress={HandleUnfollow} style={{ height: 30 }}>
                <View style={[styles.button, {backgroundColor: TagColor}]}>
                    <Text style={[styles.text, {color: textColor}]}>フォロー中</Text>
                </View>
            </Pressable>
            ):(
            <Pressable onPress={HandleFollow} style={{ height: 30 }}>
                <View style={[styles.button, {backgroundColor: '#2f95dc'}]}>
                    <Text style={[styles.text, {color: '#ffffff'}]}>フォロー</Text>
                </View>
            </Pressable>
            )
            }
        </BgView>
    )
}

const FollowerUserCard = (props: UserListType): JSX.Element => {
    const [followedStatus, setFollowedStatus] = useState(true) //初期値は毎度検証したものを入力してください
    const colorScheme = useColorScheme();
    const TagColor =
    colorScheme === 'light'
    ? backgroundColors[0][0]
    : backgroundColors[0][1]
  
    const textColor = 
    colorScheme === 'light'
    ? '#000000'
    : '#ffffff'
  
    const HandleDelete = () => {
      setFollowedStatus(false)
    }
  
      return(
          <BgView style={styles.container}>
              <View style={styles.userInfoContainer}>
                  <Image source={props.userAvatarUrl} style={styles.userAvatar}/>
                  <View>
                      <Text style={styles.userId}>{props.userID}</Text>
                      <Text style={styles.userName}>{props.userName}</Text>
                  </View>
              </View>
              {followedStatus 
              ? (
              <Pressable onPress={HandleDelete} style={{ height: 30 }}>
                  <View style={[styles.button, {backgroundColor: TagColor}]}>
                      <Text style={[styles.text, {color: textColor}]}>削除</Text>
                  </View>
              </Pressable>
              ):(
              null
              )
              }
          </BgView>
      )
  }

const UserListScreen = () : JSX.Element => {
    const { initialTab } = useLocalSearchParams()
    let initialTabName: string
    if (typeof initialTab === 'string'){
      initialTabName = initialTab
    } else {
      initialTabName = 'follower'
    }
    const tabBarHeight = useBottomTabBarHeight();

    const colorScheme = useColorScheme();

    const backGroundColor = 
    colorScheme === 'dark'
    ? '#000000'
    : '#ffffff'

    const textColor = 
    colorScheme === 'light'
    ? '#000000'
    : '#ffffff'

    const renderTabBar = props => (
      <MaterialTabBar
        {...props}
        indicatorStyle={{ backgroundColor: '#000000'}}
        style={{
          backgroundColor: 'white',
          shadowColor: 'transparent',
          shadowOffset: { width: 0, height: 0 }, 
          shadowOpacity: 0, 
          shadowRadius: 0, 
          elevation: 0,
          height: 50,
        }}
      />
    )

    return(
        <BgView style={{flex: 1}}>
        <Tabs.Container initialTabName={initialTabName} renderTabBar={renderTabBar}>
        <Tabs.Tab name='follower' label='follower'>
          <Tabs.FlashList
            data={userData}
            renderItem={({ item }) => (
              <View>
                <FollowerUserCard {...item} userName={item.user}/>
              </View>
            )}
            estimatedItemSize={70}
            contentContainerStyle={{
              backgroundColor: backGroundColor,
              paddingBottom: tabBarHeight,
              paddingVertical: 16
            }}
          />
        </Tabs.Tab>
        <Tabs.Tab name='following' label='following'>
          <Tabs.FlashList
            data={userData}
            renderItem={({ item }) => (
              <View>
                <FollowingUserCard {...item} userName={item.user}/>
              </View>
            )}
            estimatedItemSize={70}
            contentContainerStyle={{
              backgroundColor: backGroundColor,
              paddingBottom: tabBarHeight,
              paddingVertical: 16
            }}
          />
        </Tabs.Tab>
      </Tabs.Container>
      </BgView>
    )
}

export default UserListScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      justifyContent: 'space-between'
    },
    userInfoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    userAvatar:{
        marginRight: 16,
        height: 45,
        width: 45,
        borderRadius: 25,
    },
    userId:{
        fontSize:14,
        fontWeight: '500'
    },
    userName:{
        fontSize:13,
        color:'#696969'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        width: 100,
        height: 40
      },
      text: {
        fontSize: 14,
        fontWeight: '500',
      },
      tabBar: {
        backgroundColor: '#ffffff',
        height: 50,
      },
      indicator: {
        backgroundColor: '#000000'
      },
})