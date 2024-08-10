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

const width = Dimensions.get('window').width
const backgroundColors = [
    ["#F0F0F0", "#2E2E2E"],
    ["#D3D3D3", "#444444"],
    ["#FFE4B5", "#555555"],
    ["#ADD8E6", "#3B3B3B"],
    ["#FFF0F5", "#4A4A4A"]
  ];

const FollowiongUserCard = (props: UserListType): JSX.Element => {
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
            <Pressable onPress={HandleUnfollow}>
                <View style={[styles.button, {backgroundColor: TagColor, width: 200}]}>
                    <Text style={[styles.text, {color: textColor}]}>フォロー中</Text>
                </View>
            </Pressable>
            ):(
            <Pressable onPress={HandleFollow}>
                <View style={[styles.button, {backgroundColor: '#2f95dc', width: 200}]}>
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
              <Pressable onPress={HandleDelete}>
                  <View style={[styles.button, {backgroundColor: TagColor, width: 200}]}>
                      <Text style={[styles.text, {color: textColor}]}>フォロー中</Text>
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
    return(
        <BgView></BgView>
    )
}

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
      },
      text: {
        fontSize: 14,
        fontWeight: '500',
      },
})