import { Text, Image, View, StyleSheet, Pressable } from 'react-native'
import { useLocalSearchParams } from 'expo-router';
import userData from '@/src/assets/userData';

const Profile = () :JSX.Element => {
  const { userID } = useLocalSearchParams();
  const profile = userData.find((item: any) => item.userID === userID)
  const defaultImage = require('@/src/assets/images/snsicon.png');
  if (!profile) {
    return <Text>Profile not found.</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.userIdContainer}>  
        <Text style={styles.userId}>{profile?.userID}</Text>
      </View >
      <View style={styles.heading}>
        <Image 
        src={profile?.userAvatarUrl || defaultImage}
        style={styles.image}
        />
        <View style={styles.followData}>
          <Text style={styles.text1}>143</Text>
          <Text style={styles.text2}>Follorwers</Text>
        </View>
        <View style={styles.followData}>
          <Text style={styles.text1}>143</Text>
          <Text style={styles.text2}>Follorwing</Text>
        </View>
        <Pressable>
          <View style={styles.followButton}>
            <Text style={styles.followButtonText}>フォロー</Text>
          </View>
        </Pressable>
      </View>
      <Text style={styles.userName}>{profile?.user}</Text>
      <Text style={styles.userIntro}>{profile?.bio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  followData: {
    alignItems: 'center',
    width: 56,
    marginRight: 16
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 16,
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 32,
    marginRight: 24
  },
  text1: {
    fontSize: 16,
    lineHeight: 20
  },
  text2: {
    fontSize: 11,
    lineHeight: 14,
    opacity: 50
  },
  followButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 114,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#435060',
  },
  followButtonText:{
    fontSize: 17,
    lineHeight: 22,
    color: '#ffffff'
  },
  userIdContainer: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  userId: {
    fontSize: 17,
    lineHeight: 22,
    justifyContent: 'center'
  },
  userName: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    marginLeft: 16,
    marginTop: 12
  },
  userIntro: {
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 16
  }
})

export default Profile;
