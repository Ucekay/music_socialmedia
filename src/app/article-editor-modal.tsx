import { Stack, useNavigation } from 'expo-router';
import type React from 'react';
import { Button, Platform, StyleSheet, View } from 'react-native';

import BgView from '@/src/components/ThemedSecondaryBgView';

import { useActionSheet } from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';

import PagerView from 'react-native-pager-view';

import { useTheme } from '../contexts/ColorThemeContext';

import ArticleConfigScreen from '../screens/ArticleConfigScreen';

import type { ArgsToolbarCB } from '@/src/components/RichText/Toolbar/actions';
import ArticleEditorScreen from '../screens/ArticleEditorScreen';

interface ToolbarItem {
  onPress: ({ editor, editorState }: ArgsToolbarCB) => () => void;
  active: ({ editor, editorState }: ArgsToolbarCB) => boolean;
  disabled: ({ editor, editorState }: ArgsToolbarCB) => boolean;
  icon?: React.ReactNode;
}

const ArticleEditorModal = () => {
  const navigation = useNavigation();
  const { showActionSheetWithOptions } = useActionSheet();
  const { colors } = useTheme();
  const textColor = colors.text;

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
      },
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
      },
    );
  };

  return (
    <BgView style={styles.flex1}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Button title='閉じる' color={textColor} onPress={onClose} />
          ),
          headerRight: () => <Button title='公開する' onPress={onPublish} />,
          headerStyle: { backgroundColor: colors.secondaryBackground },
          headerTintColor: textColor,
        }}
      />
      <PagerView style={styles.flex1} initialPage={0}>
        <View key={1}>
          <ArticleConfigScreen />
        </View>
        <View key={2}>
          <ArticleEditorScreen />
        </View>
      </PagerView>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </BgView>
  );
};

export default ArticleEditorModal;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
});
