import { Text, View, StyleSheet, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

import userData from '../assets/userData';
import Colors from '../constants/Colors';
import FollowButton from './FollowButton';

const UserProfileTop = () => {
  const colorScheme = useColorScheme();
  const { userID } = useLocalSearchParams<{ userID: string }>();

  const themeTextColor = {
    color: Colors[colorScheme ?? 'light'].text,
  };

  const isMyAccount = userID === '@MyAccount' ? true : false;
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
          <FollowButton isMyAccount={isMyAccount} />
        </View>
        <Text style={[styles.userName, themeTextColor]}>{userInfo.user}</Text>
      </View>
      <Text style={[styles.userBio, themeTextColor]}>{userInfo.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 16,
    pointerEvents: 'box-none',
  },
  profile: {
    backgroundColor: '#ffffff',
    gap: 12,
  },
  profileHeader: {
    backgroundColor: '#ffffff',
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
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    gap: 16,
  },
  socialState: {
    backgroundColor: '#ffffff',
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
