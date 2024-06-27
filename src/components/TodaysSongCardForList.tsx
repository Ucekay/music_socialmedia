import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import BgView from './ThemedBgView';
import SecondaryBgView from './ThemedSecondaryBgView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import todaySongData from '../assets/todaySongData';
import { Text } from './Themed';
import { BlurView } from 'expo-blur';

interface Props {
    todaySong: {
        artworkUrl?: string,
        songName: string,
        artistName: string,
        body: string
    }
}

const TodaySongCardForList = (props: Props) : JSX.Element => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    const subscription = Dimensions.addEventListener('change', updateDimensions);

    // Cleanup the event listener
    return () => {
      subscription?.remove();
    };
  }, []);

  const { top, bottom } = useSafeAreaInsets();

  return (
      <BgView style={[styles.cardContainer, {width: (screenWidth-30)/2}]}>
        <BgView style={styles.card}>
          <View style={styles.todaySongInner}>
            <View style={styles.song}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: props.todaySong.artworkUrl }}
                  style={[styles.image, {width:(screenWidth-30)/2-20, height:(screenWidth-30)/2-20}]}
                />
              </View>
              <View style={styles.songInfo}>
                <Text style={styles.songName}>{props.todaySong.songName}</Text>
                <Text style={styles.artistName}>{props.todaySong.artistName}</Text>
              </View>
            </View>
            <View style={styles.body}>
              <Text  numberOfLines={2} ellipsizeMode="tail">{props.todaySong.body}</Text>
            </View>
          </View>
        </BgView>
      </BgView>
  );
};

export default TodaySongCardForList;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 10,
    gap: 10,
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
    gap: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  song: {
    alignItems: 'center',
    gap: 16,
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
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  songName: {
    fontSize: 16,
    fontWeight: '500',
  },
  artistName: {
    fontSize: 16,
  },
  songInfo: {
    alignItems: 'center',
    gap: 4,
  },
  body: {
    paddingBottom: 5,
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