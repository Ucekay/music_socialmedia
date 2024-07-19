import { View, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';

import userData from '../assets/userData';
import Colors from '../constants/Colors';
import FollowButton from './FollowButton';
import Text from './ThemedText';

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
          <Link href={'/(tabs)/profile/(profile-editor)'}>
          <View style={[styles.button, backgroundColor]}>
            <Text style={[styles.text, textColor]}>Edit</Text>
          </View>
          </Link>
        </View>
        <Text style={[styles.userName, themeTextColor]}>{userInfo.user}</Text>
      </View>
      <Text numberOfLines={4} style={[styles.userBio, themeTextColor]}>
        {userInfo.bio}
      </Text>
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
    justifyContent: 'space-between'
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
});

export default LoginUserProfileTop;
