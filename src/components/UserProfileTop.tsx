import { Link, router } from 'expo-router';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import { Image } from 'expo-image';

import { Profile } from '../backend/supabase_api/model/user';
import Colors from '../constants/Colors';
import { useTheme } from '../contexts/ColorThemeContext';

import BgView from './ThemedBgView';
import Text from './ThemedText';

const { width } = Dimensions.get('window');

const UserProfileTop = (profile: Profile) => {
  const colorScheme = useColorScheme();

  const { colors } = useTheme();

  const textColor = colors.text;

  const labelColor = colorScheme === 'light' ? 'gray' : '#F0F0F0';

  const themeTextColor = {
    color: Colors[colorScheme ?? 'light'].text,
  };

  const backgroundColors = [
    ['#F0F0F0', '#2E2E2E'],
    ['#D3D3D3', '#444444'],
    ['#FFE4B5', '#555555'],
    ['#ADD8E6', '#3B3B3B'],
    ['#FFF0F5', '#4A4A4A'],
  ];

  const TagColor =
    colorScheme === 'light' ? backgroundColors[0][0] : backgroundColors[0][1];

  const DATA = [
    { id: '1', type: 'bio' },
    { id: '2', type: 'tags' },
  ];

  const HandleFollowing = () => {
    router.push({
      pathname: `/friends/${profile.userId}`,
      params: { initialTab: 'following' }
  });
  }

  const defaultImage = require('../assets/images/snsicon.png');
  if (!profile) {
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
            {profile.bio}
          </Text>
        </View>
      );
    }
    if (item.type === 'tags') {
      return (
        <View
          style={[
            styles.swipeContainer,
            { flexWrap: 'wrap', flexDirection: 'row' },
          ]}
        >
          {profile.favArtists?.map((item, index) => (
            <View
              style={[
                styles.item,
                { backgroundColor: TagColor, marginBottom: 8 },
              ]}
              key={index}
            >
              <Text style={{ fontWeight: '500', fontSize: 12 }}>{item.artistName}</Text>
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
            source={profile.iconImageUrl || defaultImage}
            style={styles.avatar}
          />
          <View style={{ gap: 8 }}>
            <View
              style={{ alignItems: 'baseline', flexDirection: 'row', gap: 16 }}
            >
              <Text style={[styles.userName, themeTextColor]}>
                {profile.userName}
              </Text>
              <Text>{profile.profileId}</Text>
            </View>
            <View style={styles.socialStateContainer}>
              <Link
                href={{
                  pathname: '/(tabs)/friends/[userID]',
                  params: { userID: profile.userId, initialTab: 'follower' },
                }}
                asChild
              >
                <Pressable style={styles.socialState}>
                  <Text style={[styles.socialStateText, themeTextColor]}>
                    {profile.followed}
                  </Text>
                  <Text
                    style={[styles.socialStateLabel, { color: labelColor }]}
                  >
                    Followers
                  </Text>
                </Pressable>
              </Link>
              <View style={{ alignItems: 'flex-end' }}>
                <Text>|</Text>
              </View>
                <Pressable style={styles.socialState} onPress={HandleFollowing}>
                  <Text style={[styles.socialStateText, themeTextColor]}>
                    {profile.follow}
                  </Text>
                  <Text
                    style={[styles.socialStateLabel, { color: labelColor }]}
                  >
                    Following
                  </Text>
                </Pressable>
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
    </BgView>
  );
};

export default UserProfileTop;

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
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 20,
  },
  swipeContainer: {
    width: width - 32,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f0f0f0',
  },
  socialStateContainer: {
    flexDirection: 'row',
    marginRight: 8,
    gap: 8,
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
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
  },
  item: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: '#f9c2ff',
  },
});
