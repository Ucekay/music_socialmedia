import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import RNColorThief from 'react-native-color-thief';

import BgView from './ThemedBgView';
import Text from './ThemedText';

import { rgbObjectToRgbaString } from '../utils/color/ColorModifier';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import Colors from '../constants/Colors';
import type { TodaySongDataType as SongData } from '../types';
import { useTheme } from '../contexts/ColorThemeContext';
import TrackSearchField from './TrackSearchField';
import { TextInput } from 'react-native-gesture-handler';

type size = 'sm' | 'lg';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverArtUrl: string;
}

type SongEditorCardProps = {
  todaySong?: SongData;
  isEditing: boolean;
  isSongInfoVisible: boolean;
  onSongInfoPress?: () => void;
  editorContent?: string;
  setEditorContent?: React.Dispatch<React.SetStateAction<string>>;
  selectedSong?: Song | null;
  setSelectedSong?: React.Dispatch<React.SetStateAction<Song | null>>;
  setIsSongSearchActive?: React.Dispatch<React.SetStateAction<boolean>>;
  setContentCharCount?: (count: number) => void;
  size?: size;
};

const extractColorFromUrl = async (url: string) => {
  const color = await RNColorThief.getColor(url, 20, false);
  return {
    start: rgbObjectToRgbaString(color, 40),
    end: rgbObjectToRgbaString(color, 0),
  };
};

const TodaySongCard = ({
  todaySong,
  isEditing,
  isSongInfoVisible,
  onSongInfoPress,
  editorContent,
  setEditorContent,
  selectedSong,
  setSelectedSong,
  setIsSongSearchActive,
  setContentCharCount,
  size = 'lg',
}: SongEditorCardProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === 'dark'
      ? Colors.dark.secondaryBackground
      : Colors.light.background;
  const { colors } = useTheme();
  const [startColor, setStartColor] = useState('');
  const [endColor, setEndColor] = useState('');
  const prevNewlineCountRef = useRef(0);

  const handleTrackSelect = (selectedTrack: Song) => {
    if (setSelectedSong && setIsSongSearchActive) {
      setSelectedSong(selectedTrack);
      setIsSongSearchActive(false);
    }
  };

  const calculateAdjustedCount = (text: string) => {
    const newlineCount = (text.match(/\n/g) || []).length;
    return text.length + newlineCount * 19;
  };

  useEffect(() => {
    setContentCharCount?.(calculateAdjustedCount(editorContent || ''));
    prevNewlineCountRef.current = (editorContent?.match(/\n/g) || []).length;
  }, [editorContent, calculateAdjustedCount]);

  const onChangeEditorContent = (newText: string) => {
    const newAdjustedCount = calculateAdjustedCount(newText);

    setEditorContent?.(newText);
    setContentCharCount?.(newAdjustedCount);

    const newNewlineCount = (newText.match(/\n/g) || []).length;
    prevNewlineCountRef.current = newNewlineCount;
  };

  const updateGradientColors = useCallback(
    async (artworkUrl: string | undefined) => {
      if (!artworkUrl) {
        setStartColor('');
        setEndColor('');
        return;
      }

      try {
        const { start, end } = await extractColorFromUrl(artworkUrl);
        setStartColor(start);
        setEndColor(end);
      } catch (error) {
        console.error('Failed to extract color:', error);
        setStartColor('');
        setEndColor('');
      }
    },
    []
  );

  useEffect(() => {
    const artworkUrl = isEditing
      ? selectedSong?.coverArtUrl
      : todaySong?.artworkUrl;
    updateGradientColors(artworkUrl);
  }, [
    isEditing,
    todaySong?.artworkUrl,
    selectedSong?.coverArtUrl,
    updateGradientColors,
  ]);

  const shadowColor = colorScheme === 'dark' ? '#fff' : '#000';

  const renderSongInfo = () => {
    if (!isSongInfoVisible) return null;

    const getSongTitle = () => {
      if (isEditing) {
        return selectedSong?.title || 'タップして曲を選択';
      }
      return todaySong?.songName || '';
    };

    const getArtistName = () => {
      if (isEditing) {
        return selectedSong?.artist || '';
      }
      return todaySong?.artistName || '';
    };

    const shouldShowPlaceholder =
      isEditing && !selectedSong?.artist && !selectedSong?.title;

    return (
      <Pressable onPress={isEditing ? onSongInfoPress : undefined}>
        <View style={styles[`${size}SongInfo`]}>
          <Text style={styles[`${size}SongName`]}>
            {shouldShowPlaceholder ? 'タップして曲を選択' : getSongTitle()}
          </Text>
          <Text style={styles[`${size}Artist`]}>{getArtistName()}</Text>
        </View>
      </Pressable>
    );
  };

  const bodyInputRef = useRef<TextInput>(null);

  const renderBody = () => (
    <View>
      {isEditing ? (
        <TextInput
          ref={bodyInputRef}
          value={editorContent}
          onChangeText={(text) => onChangeEditorContent(text)}
          placeholder='本文を入力'
          placeholderTextColor={colors.secondaryText}
          multiline
          numberOfLines={8}
          maxLength={150}
          readOnly={!isSongInfoVisible}
          style={{ color: colors.text }}
        />
      ) : size === 'lg' ? (
        <Text>{todaySong?.body || ''}</Text>
      ) : null}
    </View>
  );

  const renderImage = () => {
    if (!isSongInfoVisible) return null;

    const getImageSource = () => {
      if (isEditing) {
        return selectedSong?.coverArtUrl;
      }
      return todaySong?.artworkUrl;
    };

    const imageSource = getImageSource();

    if (isEditing && !imageSource) {
      return (
        <View
          style={[
            styles[`${size}ImageContainer`],
            styles.editingImageContainer,
            { backgroundColor: colors.border },
          ]}
        />
      );
    }

    if (imageSource) {
      return (
        <BgView style={styles[`${size}ImageContainer`]}>
          <Image source={{ uri: imageSource }} style={styles[`${size}Image`]} />
        </BgView>
      );
    }

    return null;
  };

  const renderSong = () => {
    if (isSongInfoVisible) {
      return (
        <Animated.View
          entering={FadeIn}
          exiting={size !== 'sm' ? FadeOut : undefined}
          style={[
            styles.song,
            {
              height: size === 'lg' ? 300 : undefined,
              gap: size === 'lg' ? 28 : 12,
            },
          ]}
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
    <View style={[styles.cardContainer]}>
      <Pressable
        onPress={dismissKeyboard}
        style={[styles.card, { backgroundColor, shadowColor }]}
      >
        {startColor && endColor && (
          <Animated.View entering={FadeIn} style={StyleSheet.absoluteFill}>
            <LinearGradient
              colors={[startColor, endColor, 'transparent']}
              style={[styles.gradient, StyleSheet.absoluteFill]}
            />
          </Animated.View>
        )}
        {!isEditing && size === 'lg' && (
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
            <View style={styles.avatar}></View>
          </View>
        )}
        <View
          style={[
            styles.todaySongInner,
            { paddingHorizontal: size === 'lg' ? 4 : 0 },
          ]}
        >
          {renderSong()}
          {!isSongInfoVisible && (
            <Animated.View
              entering={FadeInDown}
              exiting={FadeOut}
              style={{
                width: '100%',
                height: 300,
              }}
            >
              <TrackSearchField
                placeholder='楽曲を検索'
                onTrackSelect={handleTrackSelect}
              />
            </Animated.View>
          )}
          {renderBody()}
        </View>
      </Pressable>
    </View>
  );
};

export default TodaySongCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
  },
  card: {
    flexGrow: 1,
    borderRadius: 16,
    borderCurve: 'continuous',
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 16,
    gap: 16,
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
    gap: 8,
    marginTop: 4,
    marginHorizontal: 4,
  },
  todaySongInner: {
    gap: 28,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
  },
  song: {
    alignItems: 'center',
  },
  lgImageContainer: {
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
  smImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 4,
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
  lgImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    borderCurve: 'continuous',
  },
  smImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
    borderCurve: 'continuous',
  },
  lgSongName: {
    fontSize: 22,
    fontWeight: '500',
  },
  smSongName: {
    fontSize: 12,
    fontWeight: '500',
  },
  lgArtist: {
    fontSize: 20,
  },
  smArtist: {
    fontSize: 12,
  },
  lgSongInfo: {
    alignItems: 'center',
    gap: 8,
  },
  smSongInfo: {
    alignItems: 'center',
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
