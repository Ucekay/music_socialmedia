import { View, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import BgView from './ThemedBgView';
import SecondaryBgView from './ThemedSecondaryBgView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import todaySongData from '../assets/todaySongData';
import { Text } from './Themed';
import { BlurView } from 'expo-blur';

const TodaySongCard = () => {
  const { top, bottom } = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight() + 20;

  const todaySong = todaySongData[0];

  return (
    <SecondaryBgView
      style={[styles.cardWrapper, { paddingTop: top, paddingBottom: bottom }]}
    >
      <View style={styles.cardContainer}>
        <BgView style={styles.card}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: todaySong.userAvatarUrl }}
              style={styles.avatar}
            />
            <Text>{todaySong.userID}</Text>
          </View>
          <View style={styles.todaySongInner}>
            <View style={styles.song}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: todaySong.artworkUrl }}
                  style={styles.image}
                />
              </View>
              <View style={styles.songInfo}>
                <Text style={styles.songName}>{todaySong.songName}</Text>
                <Text style={styles.artistName}>{todaySong.artistName}</Text>
              </View>
            </View>
            <View style={styles.body}>
              <Text>{todaySong.body}</Text>
            </View>
          </View>
        </BgView>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.playButtonContainer}>
          <FontAwesome6 name='play' size={20} color='black' />
        </View>
      </View>
    </SecondaryBgView>
  );
};

export default TodaySongCard;

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    gap: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  todaySongInner: {
    width: '100%',
    gap: 32,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  song: {
    alignItems: 'center',
    gap: 28,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  songName: {
    fontSize: 22,
    fontWeight: '500',
  },
  artistName: {
    fontSize: 20,
  },
  songInfo: {
    alignItems: 'center',
    gap: 8,
  },
  body: {
    paddingBottom: 28,
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    paddingTop: 16,
  },
  playButtonContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    paddingHorizontal: 36,
    paddingVertical: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
