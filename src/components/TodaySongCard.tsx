import { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import RNColorThief from 'react-native-color-thief';

import BgView from './ThemedBgView';
import Text from './ThemedText';

import { rgbObjectToRgbaString } from '../utils/color/ColorModifier';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import Colors from '../constants/Colors';
import type { TodaySongDataType } from '../types';
import { useTheme } from '../contexts/ColorThemeContext';
import TrackSearchField from './TrackSearchField';
import { TextInput } from 'react-native-gesture-handler';

type TodaySongCardProps = {
  todaySong?: TodaySongDataType;
  isEditing: boolean;
  songInfoShown: boolean;
  onSongInfoPress?: () => void;
  onBodyPress?: () => void;
};

const TodaySongCard = ({
  todaySong,
  isEditing,
  songInfoShown,
  onSongInfoPress,
  onBodyPress,
}: TodaySongCardProps) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;
  const { colors } = useTheme();
  const [startColor, setStartColor] = useState('');
  const [endColor, setEndColor] = useState('');

  useEffect(() => {
    if (!isEditing && todaySong?.artworkUrl) {
      RNColorThief.getColor(todaySong.artworkUrl, 20, false).then(
        (color: { r: number; g: number; b: number }) => {
          setStartColor(rgbObjectToRgbaString(color, 40));
          setEndColor(rgbObjectToRgbaString(color, 0));
        }
      );
    } else {
      setStartColor('');
      setEndColor('');
    }
  }, [todaySong?.artworkUrl, isEditing]);

  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';

  const renderSongInfo = () => {
    if (songInfoShown) {
      return (
        <Pressable onPress={isEditing ? onSongInfoPress : undefined}>
          <View style={styles.songInfo}>
            <Text style={styles.songName}>
              {isEditing ? 'タップして曲を選択' : todaySong?.songName || ''}
            </Text>
            <Text style={styles.artistName}>
              {isEditing ? '' : todaySong?.artistName || ''}
            </Text>
          </View>
        </Pressable>
      );
    }
  };

  const renderBody = () => (
    <Pressable onPress={isEditing ? onBodyPress : undefined}>
      <View>
        {isEditing ? (
          <TextInput
            placeholder='本文を入力'
            placeholderTextColor={colors.secondaryText}
            multiline
            readOnly={!songInfoShown}
            style={{ color: colors.text }}
          />
        ) : (
          <Text>{todaySong?.body || ''}</Text>
        )}
      </View>
    </Pressable>
  );

  const renderImage = () => {
    if (isEditing && songInfoShown) {
      return (
        <View
          style={[
            styles.imageContainer,
            styles.editingImageContainer,
            { backgroundColor: colors.border },
          ]}
        ></View>
      );
    } else if (songInfoShown) {
      return (
        <BgView style={styles.imageContainer}>
          <Image source={{ uri: todaySong?.artworkUrl }} style={styles.image} />
        </BgView>
      );
    }
  };

  return (
    <Animated.View style={[styles.cardContainer, { width }]}>
      <View style={[styles.card, { backgroundColor, shadowColor }]}>
        {startColor && endColor && !isEditing && (
          <Animated.View entering={FadeIn} style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={[startColor, endColor, 'transparent']}
              style={[styles.gradient, StyleSheet.absoluteFill]}
            />
          </Animated.View>
        )}
        {!isEditing && (
          <View style={styles.userInfo}>
            <Image
              source={{ uri: todaySong?.userAvatarUrl }}
              style={styles.avatar}
            />
            <Text>{todaySong?.userID || ''}</Text>
          </View>
        )}
        {isEditing && (
          <View style={styles.userInfo}>
            <View />
          </View>
        )}
        <View style={styles.todaySongInner}>
          <View style={styles.song}>
            {renderImage()}
            {renderSongInfo()}
          </View>
          {!songInfoShown && <TrackSearchField placeholder='楽曲を検索' />}
          {renderBody()}
        </View>
      </View>
    </Animated.View>
  );
};

export default TodaySongCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
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
  },
  song: {
    alignItems: 'center',
    gap: 28,
  },
  imageContainer: {
    width: 220,
    height: 220,
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
    width: '100%',
    height: '100%',
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
  editingImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
