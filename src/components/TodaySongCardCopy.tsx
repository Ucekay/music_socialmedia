import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
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
  inputText?: string;
  setInputText?: (text: string) => void;
  trackName: string;
  setTrackName: React.Dispatch<React.SetStateAction<string>>;
  displayCharCount?: number;
  setDisplayCharCount?: (count: number) => void;
};

const TodaySongCard = ({
  todaySong,
  isEditing,
  songInfoShown,
  onSongInfoPress,
  onBodyPress,
  inputText,
  setInputText,
  trackName,
  setTrackName,
  displayCharCount,
  setDisplayCharCount,
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
  const [songInfoHeight, setSongInfoHeight] = useState(0);
  const prevNewlineCountRef = useRef(0);

  const calculateAdjustedCount = (text: string) => {
    const newlineCount = (text.match(/\n/g) || []).length;
    return text.length + newlineCount * 19;
  };

  useEffect(() => {
    setDisplayCharCount?.(calculateAdjustedCount(inputText || ''));
    prevNewlineCountRef.current = (inputText?.match(/\n/g) || []).length;
  }, [inputText, calculateAdjustedCount]);

  const onChangeInputText = (newText: string) => {
    const newAdjustedCount = calculateAdjustedCount(newText);

    setInputText?.(newText);
    setDisplayCharCount?.(newAdjustedCount);

    const newNewlineCount = (newText.match(/\n/g) || []).length;
    prevNewlineCountRef.current = newNewlineCount;
  };

  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }: {
    nativeEvent: {
      layout: {
        height: number;
      };
    };
  }) => {
    setSongInfoHeight(height);
  };

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

  const bodyInputRef = useRef<TextInput>(null);

  const renderBody = () => (
    <View>
      {isEditing ? (
        <TextInput
          ref={bodyInputRef}
          value={inputText}
          onChangeText={(text) => onChangeInputText(text)}
          placeholder='本文を入力'
          placeholderTextColor={colors.secondaryText}
          multiline
          numberOfLines={8}
          maxLength={150}
          readOnly={!songInfoShown}
          style={{ color: colors.text }}
        />
      ) : (
        <Text>{todaySong?.body || ''}</Text>
      )}
    </View>
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

  const renderSong = () => {
    if (songInfoShown) {
      return (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.song}
          onLayout={onLayout}
        >
          {renderImage()}
          {renderSongInfo()}
        </Animated.View>
      );
    }
  };

  const dismissKeyboard = () => {
    if (isEditing && bodyInputRef.current?.isFocused()) {
      bodyInputRef.current?.blur();
    }
  };

  return (
    <View>
      <View style={{ height: 300 }}>
        <TrackSearchField
          placeholder='楽曲を検索'
          trackName={trackName}
          setTrackName={setTrackName}
        />
      </View>
    </View>
  );
};

export default TodaySongCard;

const styles = StyleSheet.create({
  cardContainer: {
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
