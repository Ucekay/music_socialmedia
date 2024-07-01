import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import BgView from './ThemedBgView';
import SecondaryBgView from './ThemedSecondaryBgView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Animated, {FadeIn} from 'react-native-reanimated';
import Colors from '../constants/Colors';

import todaySongData from '../assets/todaySongData';
import { Text } from './Themed';
import { BlurView } from 'expo-blur';

interface Props {
    todaySong: {
        artworkUrl?: string,
        songName: string,
        artistName: string,
        body: string,
        userID: string
    }
}

const TodaySongCardForList = (props: Props) : JSX.Element => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);
  
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;

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

  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';

  const { top, bottom } = useSafeAreaInsets();

  return (
      <BgView style={styles.cardContainer}>
        <View style={styles.card}>
          <Image
          source={{ uri: props.todaySong.artworkUrl }}
          style={styles.image}
          />
          <View style={styles.infoContainer}>
            <View style={styles.songInfo}>
              <Text style={styles.songName}>{props.todaySong.songName}</Text>
              <Text style={styles.artistName}>{props.todaySong.artistName}</Text>
            </View>
            <View style={styles.userInfo}>
              <Text>{props.todaySong.userID}</Text>
            </View>
          </View>
        </View>
      </BgView>
  );
};

export default TodaySongCardForList;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 12
  },
  card:{
    flexDirection: 'row'
  },
  infoContainer:{
    justifyContent: 'space-between'
  },
  song: {
    alignItems: 'center',
    gap: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius:12,
    borderCurve: 'continuous',
  },
  songName: {
    fontSize: 16,
    fontWeight: '500',
  },
  artistName: {
    fontSize: 16,
    color: '#808080'
  },
  songInfo: {
    marginLeft: 8,
    gap: 4,
    paddingTop: 4
  },
  userInfo: {
    marginLeft: 8,
    gap: 4,
    paddingBottom: 4
  }
});