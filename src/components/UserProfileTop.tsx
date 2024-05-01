import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import userData from '../assets/userData';

const UserProfileTop = ({ userID }: { userID: string }) => {
  const userInfo = userData.find((item) => item.userID === userID);
  const defaultImage = require('../assets/images/snsicon.png');
  if (!userInfo) {
    return <Text>User not found</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={userInfo.userAvatarUrl || defaultImage}
          style={styles.avatar}
        />
        <View>
          <View style={styles.socialStateContainer}>
            <View style={styles.socialState}>
              <Text style={styles.socialStateText}>132</Text>
              <Text style={styles.socialStateLabel}>Followers</Text>
            </View>
            <View style={styles.socialState}>
              <Text style={styles.socialStateText}>132</Text>
              <Text style={styles.socialStateLabel}>Following</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
});

export default UserProfileTop;
