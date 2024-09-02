import { useState } from 'react';
import {
  View,
  Platform,
  Button,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useNavigation } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '../contexts/ColorThemeContext';
import SecondaryBackgroundView from '../components/ThemedSecondaryBgView';
import TodaySongCard from '../components/TodaySongCard';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverArtUrl: string;
}

const SongEditorModal = () => {
  const { colors } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [isSongSearchActive, setIsSongSearchActive] = useState(false);
  const [contentCharCount, setContentCharCount] = useState(0);

  const handleCloseModal = () => {
    const title = '下書きに保存しますか？';
    const options = ['内容を削除', '内容を保存', '編集を続行'];
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
          case 1:
            navigation.goBack();
            break;
          case 2:
            break;
        }
      }
    );
  };

  const handlePublish = () => {
    const options = ['公開する', '編集を続行'];
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex) => {
        if (selectedIndex === 0) {
          // Publish logic here
        }
      }
    );
  };

  return (
    <SecondaryBackgroundView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={headerHeight + insets.top}
        style={styles.keyboardAvoidingView}
      >
        <Stack.Screen
          options={{
            headerLeft: () => (
              <Button
                title='閉じる'
                color={colors.text}
                onPress={handleCloseModal}
              />
            ),
            headerRight: () => (
              <Button title='公開する' onPress={handlePublish} />
            ),
          }}
        />
        <View style={[styles.editorContainer, { width }]}>
          <TodaySongCard
            isEditing
            onSongInfoPress={() => setIsSongSearchActive(true)}
            isSongInfoVisible={!isSongSearchActive}
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            selectedSong={selectedSong}
            setSelectedSong={setSelectedSong}
            setIsSongSearchActive={setIsSongSearchActive}
            setContentCharCount={setContentCharCount}
          />
          <CharacterCountIndicator
            currentCount={contentCharCount}
            maxCount={150}
            colors={colors}
          />
        </View>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </KeyboardAvoidingView>
    </SecondaryBackgroundView>
  );
};

const CharacterCountIndicator = ({
  currentCount,
  maxCount,
  colors,
}: {
  currentCount: number;
  maxCount: number;
  colors: any;
}) => (
  <View style={styles.characterCountContainer}>
    <View style={{ flex: 1 }}></View>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text style={[styles.characterCountText, { color: colors.text }]}>
        {currentCount}/{maxCount}文字
      </Text>
      <View
        style={[
          styles.progressBarBackground,
          { backgroundColor: colors.border },
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${Math.min((currentCount / maxCount) * 100, 100)}%`,
              backgroundColor: currentCount >= maxCount ? 'red' : colors.tint,
            },
          ]}
        />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  editorContainer: {
    paddingTop: 32,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
  },
  characterCountContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  characterCountText: {
    fontSize: 14,
  },
  progressBarBackground: {
    width: '50%',
    height: 4,
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
});

export default SongEditorModal;
