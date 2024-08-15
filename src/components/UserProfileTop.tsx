import { useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Image } from 'expo-image';

import userData from '../assets/userData';
import Colors from '../constants/Colors';
import FollowButton from './FollowButton';
import Text from './ThemedText';
import { useLocalSearchParams } from 'expo-router';

const UserProfileTop = () => {
  const colorScheme = useColorScheme();

  // stateをuseLoaclSearchParamsで取得したuserIDで変更するとrenderが多数走るためエラーを引き起こす
  const { userID } = useLocalSearchParams();

  const themeTextColor = {
    color: Colors[colorScheme ?? 'light'].text,
  };

  const userInfo = userData.find((item) => item.userID === userID);
  const defaultImage = require('../assets/images/snsicon.png');
  if (!userInfo) {
    return <Text>User not found</Text>;
  }
  return (
    <View style={styles.container}>
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
          <FollowButton isMyAccount={false} />
        </View>
        <Text style={[styles.userName, themeTextColor]}>{userInfo.user}</Text>
      </View>
      <Text
        numberOfLines={5}
        ellipsizeMode='tail'
        style={[styles.userBio, themeTextColor]}
      >
        {userInfo.bio}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  profile: {
    gap: 12,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
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
});

export default UserProfileTop;
