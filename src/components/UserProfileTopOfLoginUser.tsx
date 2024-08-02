import { View, StyleSheet, useColorScheme, Pressable, FlatList, Dimensions } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import React, {useState, useEffect} from 'react';

import userData from '../assets/userData';
import Colors from '../constants/Colors';
import FollowButton from './FollowButton';
import Text from './ThemedText';
import BgView from './ThemedBgView';

interface LoginUserProps {
    id: string
}

const LoginUserProfileTop = (props: LoginUserProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor = {
    backgroundColor: Colors[colorScheme ?? 'light'].followButtonBg,
  };
  const textColor = { color: Colors[colorScheme ?? 'light'].followButtonText };
  const userID  = props.id
  const themeTextColor = {
    color: Colors[colorScheme ?? 'light'].text,
  };

  const userInfo = userData.find((item) => item.userID === userID);
  const defaultImage = require('../assets/images/snsicon.png');
  if (!userInfo) {
    return <Text>User not found</Text>;
  }

  const colorData = 
  [
    ["#FFCDD2", "#B71C1C"],
    ["#C8E6C9", "#1B5E20"],
    ["#BBDEFB", "#0D47A1"],
    ["#FFE0B2", "#E65100"],
    ["#D1C4E9", "#4A148C"],
    ["#FFEBEE", "#D32F2F"],
    ["#C5CAE9", "#1A237E"],
    ["#E1BEE7", "#880E4F"],
    ["#FFF9C4", "#F57F17"],
    ["#B3E5FC", "#01579B"]
  ]

  return (
    <BgView style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <Image
            source={userInfo.userAvatarUrl || defaultImage}
            style={styles.avatar}
          />
          <View>
            <View style={styles.socialStateContainer}>
              <View style={styles.socialState}>
                <Text style={[styles.socialStateText, themeTextColor]}>
                  {userInfo.followers}
                </Text>
                <Text style={[styles.socialStateLabel, themeTextColor]}>
                  Followers
                </Text>
              </View>
              <View style={styles.socialState}>
                <Text style={[styles.socialStateText, themeTextColor]}>
                  {userInfo.following}
                </Text>
                <Text style={[styles.socialStateLabel, themeTextColor]}>
                  Following
                </Text>
              </View>
            </View>
          </View>
          <Link href={'/(tabs)/profile/(profile-editor)'}>
          <View style={[styles.button, backgroundColor]}>
            <Text style={[styles.text, textColor]}>Edit</Text>
          </View>
          </Link>
        </View>
        <Text style={[styles.userName, themeTextColor]}>{userInfo.user}</Text>
      </View>
      <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
      {userInfo.tag.map((item, index) => (
            <View
              style={[styles.item, {backgroundColor: colorData[0][0], marginBottom: 8}]}
              key={index}
            >
              <Text>{item}</Text>
            </View>
          ))
        }
          </View>
      <Text numberOfLines={4} style={[styles.userBio, themeTextColor]}>
        {userInfo.bio}
      </Text>
    </BgView>
  );
};

export default LoginUserProfileTop;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    pointerEvents: 'box-none',
  },
  profile: {
    gap: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    justifyContent: 'space-between'
  },
  avatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
  },
  socialStateContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  socialState: {
    alignItems: 'center',
  },
  socialStateText: {
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 15,
    fontWeight: '400',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  item: {
    padding: 5,
    marginRight: 10,
    backgroundColor: '#f9c2ff',
    borderRadius: 5,
  },
})
