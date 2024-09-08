import { Stack, useNavigation } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {
  CoreBridge,
  TenTapStartKit,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar';
import PagerView from 'react-native-pager-view';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ArticleTag from '@/src/components/ArticleTag';
import BgView from '@/src/components/ThemedSecondaryBgView';
import Text from '@/src/components/ThemedText';
import TrackEntry from '@/src/components/TrackEntry';
import Color from '@/src/constants/Colors';

import AnimatedTextInput from '../components/AnimatedPlaceholderTextInput';
import ArticleEditor from '../components/ArticleEditor';
import EditorImagePicker from '../components/EditorImagePicker';
import LiveInputField from '../components/LiveInputField';
import { useTheme } from '../contexts/ColorThemeContext';

import type { SharedValue } from 'react-native-reanimated';

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
          <BgView style={styles.editorContainer}>
            {/*<RichText editor={editor} style={styles.editor} />
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingView}
              keyboardVerticalOffset={keyboardVerticalOffset}
            >
              <Toolbar editor={editor} />
            </KeyboardAvoidingView>*/}
            <ArticleEditor />
          </BgView>
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

  const articleTypes: ('general' | 'review' | 'liveReport' | 'playlist')[] = [
    'general',
    'review',
    'liveReport',
    'playlist',
  ];

  const textColor = Color[colorScheme ?? 'light'].text;
  const secondaryTextColor = Color[colorScheme ?? 'light'].secondaryText;

  const opacityValues: {
    [key in (typeof articleTypes)[number]]: SharedValue<number>;
  } = {
    general: useSharedValue(1),
    review: useSharedValue(1),
    liveReport: useSharedValue(1),
    playlist: useSharedValue(1),
  };

  const animatedStyles: {
    [key in (typeof articleTypes)[number]]: ReturnType<typeof useAnimatedStyle>;
  } = {
    general: useAnimatedStyle(() => {
      return {
        opacity: opacityValues.general.value,
      };
    }),
    review: useAnimatedStyle(() => {
      return {
        opacity: opacityValues.review.value,
      };
    }),
    liveReport: useAnimatedStyle(() => {
      return {
        opacity: opacityValues.liveReport.value,
      };
    }),
    playlist: useAnimatedStyle(() => {
      return {
        opacity: opacityValues.playlist.value,
      };
    }),
  };

  const handleTagPress = (type: string) => {
    if (selectedType === type) {
      setSelectedType(null);
      for (const t of articleTypes) {
        opacityValues[t].value = withTiming(1);
      }
    } else {
      setSelectedType(type);
      for (const t of articleTypes) {
        opacityValues[t].value = withTiming(t === type ? 1 : 0.3);
      }
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
              {articleTypes.map((type) => (
                <Pressable
                  key={type}
                  onPress={() => handleTagPress(type)}
                  style={styles.articleTag}
                >
                  <Animated.View style={animatedStyles[type]}>
                    <ArticleTag type={type} size={17} />
                  </Animated.View>
                </Pressable>
              ))}
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  articleTag: {
    width: '45%',
    marginVertical: 8,
  },
  imagePickerText: {
    fontSize: 17,
    marginTop: 8,
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
    marginHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 4,
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
    bottom: 0,
    width: '100%',
  },
});
