import { useEffect, useState } from 'react';
import { View, StyleSheet, useColorScheme, Easing } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import RNColorThief from 'react-native-color-thief';

import BgView from './ThemedBgView';
import Text from './ThemedText';

import todaySongData from '../assets/todaySongData';
import { rgbObjectToRgbaString } from './ColorModifier';
import Animated, { FadeIn } from 'react-native-reanimated';
import Colors from '../constants/Colors';

const TodaySongCard = () => {
  const todaySong = todaySongData[1];

  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;

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

  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.card, { backgroundColor, shadowColor }]}>
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
      </View>
    </View>
  );
};

export default TodaySongCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 16,
    borderCurve: 'continuous',
    padding: 16,
    paddingBottom: 20,
    gap: 40,
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
  body: {},
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
