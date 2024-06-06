import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import RNColorThief from 'react-native-color-thief';

import BgView from './ThemedBgView';
import Text from './ThemedText';
import SecondaryBgView from './ThemedSecondaryBgView';

import todaySongData from '../assets/todaySongData';
import { rgbObjectToRgbaString } from './ColorModifier';
import Animated, { FadeIn } from 'react-native-reanimated';

const TodaySongCard = () => {
  const { top, bottom } = useSafeAreaInsets();

  const todaySong = todaySongData[0];

  const [startColor, setStartColor] = useState('');
  const [endColor, setEndColor] = useState('');

  useEffect(() => {
    RNColorThief.getColor(todaySong.artworkUrl, 20, false).then(
      (color: { r: number; g: number; b: number }) => {
        setStartColor(rgbObjectToRgbaString(color, 40));
        setEndColor(rgbObjectToRgbaString(color, 0));
      }
    );
  }, [todaySong.artworkUrl]);

  return (
    <SecondaryBgView
      style={[styles.cardWrapper, { paddingTop: top, paddingBottom: bottom }]}
    >
      <View style={styles.cardContainer}>
        <BgView style={styles.card}>
          {startColor && endColor && (
            <Animated.View entering={FadeIn} style={StyleSheet.absoluteFill}>
              <LinearGradient
                colors={[startColor, endColor, 'transparent']}
                style={[styles.gradient, StyleSheet.absoluteFill]}
              />
            </Animated.View>
          )}
          <View style={styles.userInfo}>
            <Image
              source={{ uri: todaySong.userAvatarUrl }}
              style={styles.avatar}
            />
            <Text>{todaySong.userID}</Text>
          </View>
          <View style={styles.todaySongInner}>
            <View style={styles.song}>
              <BgView style={styles.imageContainer}>
                <Image
                  source={{ uri: todaySong.artworkUrl }}
                  style={styles.image}
                />
              </BgView>
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
    borderRadius: 16,
    borderCurve: 'continuous',
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
  gradient: {
    borderRadius: 16,
    borderCurve: 'continuous',
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
    borderRadius: 16,
    borderCurve: 'continuous',
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
