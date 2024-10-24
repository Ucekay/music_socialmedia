import { useFocusEffect, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { when } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
import { Add01Icon, Vynil01Icon } from 'hugeicons-react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import Text from '@/src/components/ThemedText';

import { useTheme } from '../contexts/ColorThemeContext';
import { musicItem$ } from '../observables';

import { Button } from './Button';
import EditorImagePicker from './EditorImagePicker';

interface Track {
  id: string;
  title: string;
  artistName: string;
  artworkUrl: string;
}

const TrackEntry = observer(() => {
  const router = useRouter();
  const { colors } = useTheme();
  const secondaryTextColor = colors.secondaryText;
  const titleInputRef = useRef<TextInput>(null);
  const artistNameInputRef = useRef<TextInput>(null);

  const [manualInput, setManualInput] = useState(false);
  const [track, setTrack] = useState<Track>({
    id: '',
    title: '',
    artistName: '',
    artworkUrl: '',
  });
  const [title, setTitle] = useState('');
  const [artistName, setArtistName] = useState('');

  useFocusEffect(() => {
    musicItem$.status.set('idle');
  });

  const showTrackInput = () => {
    setManualInput(true);
  };

  const handleTrackSearch = () => {
    musicItem$.status.set('pending');
    when(
      () => musicItem$.status.get(),
      (status) => {
        if (status === 'selected') {
          const item = musicItem$.item.get();
          if (item && item.type === ('song' || 'album')) {
            setTrack({
              id: item.id,
              title: item.title,
              artistName: item.artistName,
              artworkUrl: item.artwork.url,
            });
            musicItem$.item.delete();
          }
        }
      },
    );
    router.push('/searching-music-modal');
  };

  const handleCancel = () => {
    setTitle('');
    setArtistName('');
    setManualInput(false);
  };

  const handleAdd = () => {
    setTrack({ ...track, title: title, artistName: artistName });
    setManualInput(false);
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={styles.searchFieldWrapper}
    >
      <Text style={styles.label}>楽曲</Text>
      {track.artistName && !manualInput && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.inputContainer}
        >
          <Text style={{ fontSize: 17 }}>楽曲名　　　　{track.title}</Text>
          <Text style={{ fontSize: 17 }}>アーティスト　{track.artistName}</Text>
        </Animated.View>
      )}
      {!manualInput && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.inputContainer}
        >
          <Button
            icon={'Vynil01Icon'}
            iconPosition='right'
            renderIcon={({ color, size }) => (
              <Vynil01Icon color={color} size={size} />
            )}
            size='large'
            title='楽曲を検索'
            variant='border'
            onPress={handleTrackSearch}
          />
          <Button
            icon={'Add01Icon'}
            iconPosition='right'
            renderIcon={({ color, size }) => (
              <Add01Icon color={color} size={size} />
            )}
            size='large'
            title='自分で入力する'
            variant='border'
            onPress={showTrackInput}
          />
        </Animated.View>
      )}

      {manualInput && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.inputContainer}
        >
          <TextInput
            ref={titleInputRef}
            style={[styles.input, { borderColor: colors.secondaryText }]}
            placeholder='楽曲名'
            placeholderTextColor={secondaryTextColor}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            ref={artistNameInputRef}
            style={[styles.input, { borderColor: colors.secondaryText }]}
            placeholder='アーティスト名'
            placeholderTextColor={secondaryTextColor}
            value={artistName}
            onChangeText={(text) => setArtistName(text)}
          />
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Button
                backgroundColor={colors.distractive}
                fullWidth
                title='キャンセル'
                onPress={handleCancel}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Button fullWidth title='追加' onPress={handleAdd} />
            </View>
          </View>
        </Animated.View>
      )}
      {track.title && !track.artworkUrl && (
        <View style={{ gap: 12 }}>
          <Animated.Text
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.imagePickerText, { color: colors.text }]}
          >
            見出し画像
          </Animated.Text>
          <View style={{ paddingHorizontal: 12 }}>
            <EditorImagePicker />
          </View>
        </View>
      )}
    </Animated.View>
  );
});

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
    borderCurve: 'continuous',
    borderRadius: 12,
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    fontWeight: '500',
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderCurve: 'continuous',
    borderRadius: 12,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  icon: {
    borderRadius: 100,
    borderWidth: 1,
  },
  input: {
    fontSize: 17,
    width: '100%',
    padding: 12,
    paddingVertical: 14,
    borderCurve: 'continuous',
    borderRadius: 12,
    borderWidth: 1,
  },
  imagePickerText: {
    fontSize: 17,
  },
});
