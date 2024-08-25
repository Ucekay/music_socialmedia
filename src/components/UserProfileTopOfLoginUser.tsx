import { View, StyleSheet, useColorScheme, Pressable, FlatList, Dimensions } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import React, {useState, useEffect, useRef} from 'react';
import userData from '../assets/userData';
import Colors from '../constants/Colors';
import Text from './ThemedText';
import BgView from './ThemedBgView';

interface LoginUserProps {
    id: string
}

const { width } = Dimensions.get('window');


const LoginUserProfileTop = (props: LoginUserProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor = {
    backgroundColor: Colors[colorScheme ?? 'light'].followButtonBg,
  };
  const textColor = 
  colorScheme === 'light'
  ? '#000000'
  : '#ffffff'

  const labelColor =
  colorScheme === 'light'
  ? "gray"
  : "#F0F0F0"
  
  const userID  = props.id
  const themeTextColor = {
    color: Colors[colorScheme ?? 'light'].text,
  };

  const backgroundColors = [
    ["#F0F0F0", "#2E2E2E"],
    ["#D3D3D3", "#444444"],
    ["#FFE4B5", "#555555"],
    ["#ADD8E6", "#3B3B3B"],
    ["#FFF0F5", "#4A4A4A"]
  ];

  const TagColor =
  colorScheme === 'light'
  ? backgroundColors[0][0]
  : backgroundColors[0][1]

  const DATA = [
    { id: '1', type: 'bio' },
    { id: '2', type: 'tags' },
  ]; 

  const userInfo = userData.find((item) => item.userID === userID);
  const defaultImage = require('../assets/images/snsicon.png');
  if (!userInfo) {
    return <Text>User not found</Text>;
  }

  const renderItem = ({ item }: { item: { id: string; type: string } }) => {
    if (item.type === 'bio') {
      return (
        <View
          style={[
            styles.swipeContainer,
            { flexWrap: 'wrap', flexDirection: 'row' },
          ]}
        >
          <Text style={[styles.userBio, { lineHeight: 22 }]} numberOfLines={4}>
            {userInfo.bio}
          </Text>
        </View>
      );
    } else if (item.type === 'tags') {
      return (
        <View
          style={[
            styles.swipeContainer,
            { flexWrap: 'wrap', flexDirection: 'row' },
          ]}
        >
          {userInfo.tag?.map((item, index) => (
            <View
              style={[
                styles.item,
                { backgroundColor: TagColor, marginBottom: 8 },
              ]}
              key={index}
            >
              <Text style={{ fontWeight: '500', fontSize: 12 }}>{item}</Text>
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <BgView style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
            <Image
              source={userInfo.userAvatarUrl || defaultImage}
              style={styles.avatar}
            />
            <View style={{gap: 8}}>
              <View style={{alignItems: 'baseline',flexDirection: 'row',gap: 16,}}>
                <Text style={[styles.userName, themeTextColor]}>{userInfo.user}</Text>
                <Text>{userInfo.userID}</Text>
              </View>
              <View style={styles.socialStateContainer}>
                <Link href={{pathname: '/(tabs)/friends/[userID]', params: {userID: 'Taro1234', initialTab: 'follower'}}} asChild>
                  <Pressable style={styles.socialState}>
                  <Text style={[styles.socialStateText, themeTextColor]}>
                    {userInfo.followers}
                  </Text>
                  <Text style={[styles.socialStateLabel,  {color: labelColor}]}>
                    Followers
                  </Text>
                  </Pressable>
                </Link>
                <View style={{alignItems: 'flex-end'}}>
                  <Text>|</Text>
                </View>
                <Link href={{pathname: '/(tabs)/friends/[userID]', params: {userID: 'Taro1234', initialTab: 'following'}}} asChild>
                <Pressable style={styles.socialState}>
                  <Text style={[styles.socialStateText, themeTextColor]}>
                    {userInfo.following}
                  </Text>
                  <Text style={[styles.socialStateLabel, {color: labelColor}]}>
                    Following
                  </Text>
                  </Pressable>
                </Link>
              </View>
          </View>
        </View>
      </View>
      <FlatList
      horizontal
      pagingEnabled
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
    />
    <View style={{flexDirection: 'row', gap:10, width: width-32}}>
    <Link href={'/(tabs)/profile/profile-editor-modal'} style={{flex:1}}>
          <View style={[styles.button, {backgroundColor: TagColor, width: width/2-24}]}>
            <Text style={[styles.text, {color: textColor}]}>プロフィールを編集</Text>
          </View>
    </Link>
    <Link href={'/playlists/Taro1234'} style={{flex:1}}>
      <View style={[styles.button, {backgroundColor: TagColor, width: width/2-24}]}>
        <Text style={[styles.text, {color: textColor}]}>プレイリストを参照</Text>
      </View>
    </Link>
    </View>
    </BgView>
  );
};

export default LoginUserProfileTop;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 20,
    pointerEvents: 'box-none',
  },
  profile: {
    gap: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 20,
  },
  swipeContainer:{
    width: width-32,
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
  },
  socialStateContainer: {
    flexDirection: 'row',
    gap: 8,
    marginRight: 8,
  },
  socialState: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 4,
  },
  socialStateText: {
    fontSize: 14,
    fontWeight: '400',
  },
  socialStateLabel: {
    fontSize: 12,
    fontWeight: '400',
  },
  userName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000000',
  },
  userBio: {
    fontSize: 14,
    fontWeight: '400',
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
  row: {
    flexDirection: 'row'
  },
  item: {
    paddingVertical: 5,
    paddingHorizontal:10,
    marginRight: 10,
    backgroundColor: '#f9c2ff',
    borderRadius: 12,
  },
})
