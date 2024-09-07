import {
  CoreBridge,
  RichText,
  TenTapStartKit,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { Stack, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  FadeIn,
  FadeOut,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArticleTag from '@/src/components/ArticleTag';
import Color from '@/src/constants/Colors';

import BgView from '@/src/components/ThemedSecondaryBgView';
import Text from '@/src/components/ThemedText';
import TrackEntry from '@/src/components/TrackEntry';
import AnimatedTextInput from '../components/AnimatedPlaceholderTextInput';
import EditorImagePicker from '../components/EditorImagePicker';
import LiveInputField from '../components/LiveInputField';
import { useTheme } from '../contexts/ColorThemeContext';

const ArticleEditorModal = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const keyboardVerticalOffset = headerHeight + top;
  const { colors } = useTheme();
  const { showActionSheetWithOptions } = useActionSheet();

  const textColor = colors.text;

  const editorStyle = `
  *{
    color: ${textColor};
    }`;

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    bridgeExtensions: [...TenTapStartKit, CoreBridge.configureCSS(editorStyle)],
  });

  editor.injectCSS(editorStyle, '*');

  const content = useEditorContent(editor, { type: 'html' });

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
          console.log(content);
        }
      },
    );
  };

  return (
    <BgView style={{ flex: 1, paddingTop: insets.top }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <Button title='閉じる' color={textColor} onPress={onClose} />
          ),
          headerRight: () => <Button title='公開する' onPress={onPublish} />,
        }}
      />
      <PagerView style={{ flex: 1 }} initialPage={0}>
        <View key={1}>
          <ArticleConfigScreen />
        </View>
        <View key={2}>
          <View style={styles.editorContainer}>
            <RichText editor={editor} style={styles.editor} />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <Toolbar editor={editor} />
            </KeyboardAvoidingView>
          </View>
        </View>
      </PagerView>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </BgView>
  );
};

const ArticleConfigScreen = () => {
  const colorScheme = useColorScheme();

  const [selectedType, setSelectedType] = useState<string | null>(null);

  const articleTypes = ['general', 'review', 'liveReport', 'playlist'];

  const textColor = Color[colorScheme ?? 'light'].text;
  const secondaryTextColor = Color[colorScheme ?? 'light'].secondaryText;

  const opacityValues: { [key: string]: SharedValue<number> } =
    articleTypes.reduce(
      (acc, type) => {
        acc[type] = useSharedValue(1);
        return acc;
      },
      {} as { [key: string]: SharedValue<number> },
    );

  const handleTagPress = (type: string) => {
    if (selectedType === type) {
      setSelectedType(null);
      articleTypes.forEach((t) => {
        opacityValues[t].value = withTiming(1);
      });
    } else {
      setSelectedType(type);
      articleTypes.forEach((t) => {
        opacityValues[t].value = withTiming(t === type ? 1 : 0.3);
      });
    }
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <BgView style={styles.container}>
        <AnimatedTextInput
          label='Article Title'
          focusedLabelTop={16}
          focusedLabelSize={16}
          multiline={true}
          blurOnSubmit={true}
          style={[
            styles.title,
            { color: textColor, borderBottomColor: secondaryTextColor },
          ]}
        />
        <View style={styles.articleMetadataContainer}>
          <View style={styles.articleTagWrapper}>
            <Text style={styles.articlePickerText}>Articleの種類</Text>
            <View style={styles.articleTagContainer}>
              {articleTypes.map((type) => {
                const animatedStyle = useAnimatedStyle(() => {
                  return {
                    opacity: opacityValues[type].value,
                  };
                });

                return (
                  <Pressable
                    key={type}
                    onPress={() => handleTagPress(type)}
                    style={styles.articleTag}
                  >
                    <Animated.View style={animatedStyle}>
                      <ArticleTag type={type} size={17} />
                    </Animated.View>
                  </Pressable>
                );
              })}
            </View>
          </View>
          {selectedType === 'general' && (
            <>
              <Animated.Text
                entering={FadeIn}
                exiting={FadeOut}
                style={[styles.imagePickerText, { color: textColor }]}
              >
                見出し画像
              </Animated.Text>
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.imagePickerContainer}
              >
                <EditorImagePicker />
              </Animated.View>
            </>
          )}
          {selectedType === 'review' && <TrackEntry />}
          {selectedType === 'liveReport' && (
            <>
              <LiveInputField />
              <Animated.Text
                entering={FadeIn}
                exiting={FadeOut}
                style={[styles.imagePickerText, { color: textColor }]}
              >
                見出し画像
              </Animated.Text>
              <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.imagePickerContainer}
              >
                <EditorImagePicker />
              </Animated.View>
            </>
          )}
        </View>
      </BgView>
    </ScrollView>
  );
};

export default ArticleEditorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 36,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    borderBottomWidth: 1,
  },
  articleMetadataContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  articlePickerText: {
    fontSize: 17,
  },
  articleTagWrapper: {
    gap: 4,
  },
  articleTagContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articleTag: {
    width: '45%',
    marginVertical: 8,
  },
  imagePickerText: {
    marginTop: 8,
    fontSize: 17,
  },
  imagePickerContainer: {
    width: '100%',
    paddingHorizontal: 12,
    gap: 12,
  },
  bottomButtonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: 0,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 16,
  },
  editorContainer: {
    flex: 1,
  },
  editor: {
    marginHorizontal: 16,
    backgroundColor: 'transparent',
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});
