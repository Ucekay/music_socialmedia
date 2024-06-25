import { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  useColorScheme,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput,
} from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { Text } from './Themed';
import EditorMetadataInput from './EditorMetadataInput';
import EditorOptionButton from './EditorOptionButton';
import Colors, { TagsColors } from '../constants/Colors';
import AddOrCancelButtons from './AddOrCancelButtons';
import EditorImagePicker from './EditorImagePicker';

const LiveInputField = () => {
  const [liveName, setLiveName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [manualInput, setManualInput] = useState(false);

  const colorScheme = useColorScheme();
  const secondaryTextColor = Colors[colorScheme ?? 'light'].secondaryText;
  const liveNameInputBgColor =
    TagsColors.liveReport[colorScheme ?? 'light'].background;
  const liveNameInputTextColor =
    TagsColors.liveReport[colorScheme ?? 'light'].text;
  const artistInputBgColor = Colors[colorScheme ?? 'light'].appleMusicBg;
  const artistInputTextColor = Colors[colorScheme ?? 'light'].appleMusicText;

  const handleLiveNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setLiveName(e.nativeEvent.text);
  };

  const handleArtistNameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    setArtistName(e.nativeEvent.text);
  };

  const showArtistInput = () => {
    setManualInput(true);
  };

  const handleCancel = () => {
    setManualInput(false);
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
      <Text style={styles.label}>ライブの詳細</Text>
      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputInner,
            {
              backgroundColor: liveNameInputBgColor,
              borderColor: liveNameInputBgColor,
            },
          ]}
        >
          <TextInput
            placeholder='イベント名を入力'
            placeholderTextColor={liveNameInputTextColor}
            style={[styles.inputText, { color: liveNameInputTextColor }]}
          />
        </View>
      </View>
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
                backgroundColor: artistInputBgColor,
                borderColor: artistInputBgColor,
              },
            ]}
          >
            <TextInput
              placeholder='アーティストを検索'
              placeholderTextColor={artistInputTextColor}
              style={[styles.inputText, { color: artistInputTextColor }]}
            />
          </View>
          <EditorOptionButton
            title='自分で入力する'
            onPress={showArtistInput}
          />
        </Animated.View>
      )}
      {manualInput && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.inputContainer}
        >
          <EditorMetadataInput
            borderColor={artistInputTextColor}
            placeholder='アーティスト名'
            placeholderTextColor={secondaryTextColor}
            onChange={handleArtistNameChange}
            style={{ color: secondaryTextColor }}
          />
          <AddOrCancelButtons
            handleCancel={handleCancel}
            handleAdd={handleAdd}
          />
        </Animated.View>
      )}
      <Text style={styles.label}>見出し画像</Text>
      <View style={styles.inputContainer}>
        <EditorImagePicker />
      </View>
    </Animated.View>
  );
};

export default LiveInputField;

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
  icon: {
    borderWidth: 1,
    borderRadius: 100,
  },
});
