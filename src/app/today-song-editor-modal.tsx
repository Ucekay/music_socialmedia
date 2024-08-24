import { useState } from 'react';
import {
  View,
  Platform,
  Button,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useNavigation } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../contexts/ColorThemeContext';
import SecondaryBgView from '../components/ThemedSecondaryBgView';
import TodaySongCard from '../components/TodaySongCard';

interface Track {
  id: string;
  songName: string;
  artistName: string;
  artworkUrl: string;
}

const TodaySongEditorModal = () => {
  const { colors } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const [track, setTrack] = useState<Track>({
    id: '',
    songName: '',
    artistName: '',
    artworkUrl: '',
  });
  const [inputText, setInputText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [displayCharCount, setDisplayCharCount] = useState(0);

  const onClose = () => {
    const title = '下書きに保存しまますか？';
    const options = ['内容を削除する', '内容を保存する', '編集を続行する'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        title,
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            navigation.goBack();
            break;
          case 1:
            navigation.goBack();
            break;
          case 2:
            break;
        }
      }
    );
  };

  const onPublish = () => {
    const options = ['公開する', '編集を続行する'];
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex === 0) {
        }
      }
    );
  };

  return (
    <SecondaryBgView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight + insets.top}
        style={{
          flex: 1,
        }}
      >
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Button title='閉じる' color={colors.text} onPress={onClose} />
            ),
            headerRight: () => <Button title='公開する' onPress={onPublish} />,
          }}
        />
        <View
          style={{
            paddingTop: 32,
            justifyContent: 'flex-end',
          }}
        >
          <TodaySongCard
            isEditing
            onSongInfoPress={() => setIsSearching(true)}
            songInfoShown={!isSearching}
            inputText={inputText}
            setInputText={setInputText}
            track={track}
            setTrack={setTrack}
            setIsSearching={setIsSearching}
            displayCharCount={displayCharCount}
            setDisplayCharCount={setDisplayCharCount}
          />
          <View
            style={{
              paddingVertical: 16,
              paddingHorizontal: 32,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ color: colors.text }}>
              {displayCharCount}/150文字
            </Text>
            <View
              style={{
                width: '60%',
                height: 4,
                backgroundColor: colors.border,
                borderRadius: 2,
              }}
            >
              <View
                style={{
                  width:
                    displayCharCount <= 150
                      ? `${(displayCharCount / 150) * 100}%`
                      : '100%',
                  height: '100%',
                  backgroundColor: displayCharCount > 150 ? 'red' : colors.tint,
                  borderRadius: 2,
                }}
              />
            </View>
          </View>
        </View>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </KeyboardAvoidingView>
    </SecondaryBgView>
  );
};

export default TodaySongEditorModal;
