import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState } from 'react';
import {
  type NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  type TextInputChangeEventData,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import EditorMetadataInput from '@/src/components/EditorMetadataInput';
import Text from '@/src/components/ThemedText';
import { useTheme } from '../contexts/ColorThemeContext';
import AddOrCancelButtons from './AddOrCancelButtons';
import TrackSearchField from './TrackSearchField';

interface Track {
  id: string;
  songName: string;
  artistName: string;
  artworkUrl: string;
}

const TrackEntry = () => {
  const { colors } = useTheme();
  const searchFieldTextColor = colors.appleMusicText;
  const secondaryTextColor = colors.secondaryText;

  const [manualInput, setManualInput] = useState(false);
  const [track, setTrack] = useState<Track>({
    id: '',
    songName: '',
    artistName: '',
    artworkUrl: '',
  });
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');

  const showTrackInput = () => {
    setManualInput(true);
  };

  const handleCancel = () => {
    setManualInput(false);
  };

  const handleTrackChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setTrackName(e.nativeEvent.text);
  };

  const handleArtistChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setArtistName(e.nativeEvent.text);
  };

  const handleAdd = () => {
    setManualInput(false);
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.searchFieldWrapper}
    >
      <Text style={styles.label}>楽曲</Text>
      {!manualInput && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.inputContainer}
        >
          <TrackSearchField
            placeholder='楽曲名を検索'
            onTrackSelect={() => setTrack}
          />
          <Pressable onPress={showTrackInput}>
            <Animated.View
              style={[styles.option, { borderColor: secondaryTextColor }]}
            >
              <Text style={[styles.optionText, { color: secondaryTextColor }]}>
                自分で入力する
              </Text>
              <FontAwesome6 name='plus' size={15} color={secondaryTextColor} />
            </Animated.View>
          </Pressable>
        </Animated.View>
      )}
      {manualInput && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.inputContainer}
        >
          <EditorMetadataInput
            borderColor={searchFieldTextColor}
            placeholder='楽曲名'
            placeholderTextColor={secondaryTextColor}
            onChange={handleTrackChange}
            style={{ color: secondaryTextColor }}
          />
          <EditorMetadataInput
            borderColor={searchFieldTextColor}
            placeholder='アーティスト名'
            placeholderTextColor={secondaryTextColor}
            onChange={handleArtistChange}
            style={{ color: secondaryTextColor }}
          />
          <AddOrCancelButtons
            handleCancel={handleCancel}
            handleAdd={handleAdd}
          />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default TrackEntry;

const styles = StyleSheet.create({
  searchFieldWrapper: {
    gap: 12,
  },
  label: {
    fontSize: 17,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 12,
    gap: 12,
  },
  inputInner: {
    padding: 12,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderCurve: 'continuous',
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  icon: {
    borderWidth: 1,
    borderRadius: 100,
  },
});
