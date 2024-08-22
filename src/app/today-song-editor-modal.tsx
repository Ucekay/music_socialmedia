import { View, Platform, Button, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Stack, useNavigation } from 'expo-router';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useTheme } from '../contexts/ColorThemeContext';
import SecondaryBgView from '../components/ThemedSecondaryBgView';
import TrackSearchField from '../components/TrackSearchField';
import { useState } from 'react';
import TodaySongCard from '../components/TodaySongCard';

const TodaySongEditorModal = () => {
  const { colors } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();
  const [trackName, setTrackName] = useState('');
  const [inputText, setInputText] = useState('');

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
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Button title='閉じる' color={colors.text} onPress={onClose} />
          ),
          headerRight: () => <Button title='公開する' onPress={onPublish} />,
        }}
      />
      <View style={{ paddingTop: 32 }}>
        <TodaySongCard isEditing />
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </SecondaryBgView>
  );
};

export default TodaySongEditorModal;
