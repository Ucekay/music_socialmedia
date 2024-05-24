import { useState } from 'react';
import {
  View,
  StyleSheet,
  useColorScheme,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import Colors from '../constants/Colors';
import Text from '@/src/components/ThemedText';
import EditorMetadataInput from '@/src/components/EditorMetadataInput';

const TrackSearchField = () => {
  const colorScheme = useColorScheme();
  const searchFieldTextColor = Colors[colorScheme ?? 'light'].appleMusicText;
  const searchFieldBgColor = Colors[colorScheme ?? 'light'].appleMusicBg;
  const secondaryTextColor = Colors[colorScheme ?? 'light'].secondaryText;

  const [manualInput, setManualInput] = useState(false);
  const [trackName, setTrackName] = useState('');
  const [artistName, setArtistName] = useState('');

  const showTrackInput = () => {
    setManualInput(true);
  };

  const handleCancel = () => {
    setManualInput(false);
  };

  const handleTrackChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setTrackName(e.nativeEvent.text);
  };

  const handleArtistChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setArtistName(e.nativeEvent.text);
  };

  const handleSubmit = () => {
    setManualInput(false);
  };

  let trackData: any = [];
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.searchFieldWrapper}
    >
      <Text style={styles.label}>レビューする楽曲</Text>
      {!manualInput && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.inputContainer}
        >
          <View
            style={[
              styles.inputInner,
              {
                backgroundColor: searchFieldBgColor,
                borderColor: searchFieldBgColor,
              },
            ]}
          >
            <TextInput
              placeholder='楽曲を検索'
              placeholderTextColor={searchFieldTextColor}
              style={[styles.inputText, { color: searchFieldTextColor }]}
            />
          </View>
          <Pressable onPress={showTrackInput}>
            <Animated.View
              style={[styles.option, { borderColor: searchFieldTextColor }]}
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
            onChange={handleTrackChange}
            style={{ color: secondaryTextColor }}
          />
          <View style={styles.buttonContainer}>
            <Pressable onPress={handleCancel} style={styles.button}>
              <Text
                style={{ color: Colors[colorScheme ?? 'light'].cancelText }}
              >
                キャンセル
              </Text>
            </Pressable>
            <View
              style={[
                styles.separator,
                { backgroundColor: secondaryTextColor },
              ]}
            />
            <Pressable onPress={handleSubmit} style={styles.button}>
              <Text>追加</Text>
            </Pressable>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default TrackSearchField;

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
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
  },
  optionText: {
    fontSize: 16,
  },
  icon: {
    borderWidth: 1,
    borderRadius: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'space-evenly',
    paddingHorizontal: 6,
  },
  button: {
    width: '50%',
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
  },
  separator: {
    width: 1,
  },
});
