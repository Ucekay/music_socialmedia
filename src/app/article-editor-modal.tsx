import { Stack, useNavigation } from 'expo-router';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Button,
  PixelRatio,
  Platform,
  Pressable,
  Text as RNText,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
  useWindowDimensions,
} from 'react-native';

import {
  CoreBridge,
  RichText,
  TenTapStartKit,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import {
  darkColorKeyboardTheme,
  defaultColorKeyboardTheme,
} from '@10play/tentap-editor/src/RichText/Keyboard/keyboardTheme';
import { useActionSheet } from '@expo/react-native-action-sheet';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar';
import {
  Add01Icon,
  Album02Icon,
  ArrowDown01Icon,
  ArrowTurnBackwardIcon,
  ArrowTurnForwardIcon,
  LeftToRightBlockQuoteIcon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  Link04Icon,
  SolidLine01Icon,
  TextBoldIcon,
  TextFontIcon,
  TextIndentLessIcon,
  TextIndentMoreIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextSubscriptIcon,
  TextSuperscriptIcon,
  TextUnderlineIcon,
  Vynil03Icon,
  YoutubeIcon,
} from 'hugeicons-react-native';
import ImagePicker, { type Image } from 'react-native-image-crop-picker';
import {
  KeyboardStickyView,
  useReanimatedKeyboardAnimation,
} from 'react-native-keyboard-controller';
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
import { Button as CustomButton } from '@/src/components/Button';
import BgView from '@/src/components/ThemedSecondaryBgView';
import Text from '@/src/components/ThemedText';
import TrackEntry from '@/src/components/TrackEntry';
import Color from '@/src/constants/Colors';
import { editorHtml } from '@/web-editor/build/editorHtml';

import AnimatedTextInput from '../components/AnimatedPlaceholderTextInput';
import EditorImagePicker from '../components/EditorImagePicker';
import EditorToolbar from '../components/EditorToolbar';
import LiveInputField from '../components/LiveInputField';
import Colors from '../constants/Colors';
import { useTheme } from '../contexts/ColorThemeContext';
import {
  CodeBlockBridge,
  HorizontalRuleBridge,
  NodeHighlightBridge,
  SubscriptBridge,
  SuperscriptBridge,
  YouTubeBridge,
} from '../rich-text-bridges';

import type {
  BridgeState,
  ColorKeyboardTheme,
  EditorBridge,
  EditorTheme,
  ToolbarTheme,
} from '@10play/tentap-editor';
import type { Level } from '@tiptap/extension-heading';
import type { ArgsToolbarCB } from '../components/RichText/Toolbar/actions';

interface ToolbarItem {
  onPress: ({ editor, editorState }: ArgsToolbarCB) => () => void;
  active: ({ editor, editorState }: ArgsToolbarCB) => boolean;
  disabled: ({ editor, editorState }: ArgsToolbarCB) => boolean;
  icon?: React.ReactNode;
}

const DEFAULT_EDITOR_CSS = `
  *{
    color: black;
    background-color: transparent;
  }
  img {
  width: 100%;
  margin: 1rem 0;
  border-radius: 0.5rem;
  }
    `;
const DARK_EDITOR_CSS = `
  *{
    color: white;
    background-color: transparent;
  }
  img {
  width: 100%;
  margin: 1rem 0;
  border-radius: 0.5rem;
  }
  blockquote {
    border-left: 3px solid #babaca;
    padding-left: 1rem;
  }
  `;

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

const HeadingOptions = ({
  editor,
  editorState,
}: { editor: EditorBridge; editorState: BridgeState }) => {
  const headingLevel = editorState.headingLevel;
  const isCodeBlockActive = editorState.isCodeBlockActive;
  const deactivateCodeBlock = () => {
    if (isCodeBlockActive) {
      editor.toggleCodeBlock();
    }
  };

  const handleSelectHeading = (level: Level) => {
    deactivateCodeBlock();
    editor.toggleHeading(level);
  };

  const handleSelectBody = () => {
    if (headingLevel !== undefined) {
      editor.toggleHeading(headingLevel as Level);
    }
    deactivateCodeBlock();
  };

  const handleSelectMono = () => {
    if (headingLevel !== undefined) {
      editor.toggleHeading(headingLevel as Level);
    }
    if (isCodeBlockActive) {
      editor.setHardBreak();
    } else {
      editor.toggleCodeBlock();
    }
  };

  return (
    <View style={styles.headingOptionsContainer}>
      <Pressable
        onPress={() => handleSelectHeading(2)}
        style={[
          styles.headingOptionWrapper,
          {
            backgroundColor:
              headingLevel === 2 ? Colors.dark.tint : 'transparent',
          },
        ]}
      >
        <RNText style={styles.headingText}>見出し</RNText>
      </Pressable>
      <Pressable
        onPress={() => handleSelectHeading(3)}
        style={[
          styles.headingOptionWrapper,
          {
            backgroundColor:
              headingLevel === 3 ? Colors.dark.tint : 'transparent',
          },
        ]}
      >
        <RNText style={styles.textSubhead}>小見出し</RNText>
      </Pressable>
      <Pressable
        onPress={() => handleSelectBody()}
        style={[
          styles.headingOptionWrapper,
          {
            backgroundColor:
              headingLevel === undefined && !isCodeBlockActive
                ? Colors.dark.tint
                : 'transparent',
          },
        ]}
      >
        <RNText style={styles.textBody}>本文</RNText>
      </Pressable>
      <Pressable
        onPress={() => handleSelectMono()}
        style={[
          styles.headingOptionWrapper,
          {
            backgroundColor: isCodeBlockActive
              ? Colors.dark.tint
              : 'transparent',
          },
        ]}
      >
        <RNText style={styles.monoText}>等幅</RNText>
      </Pressable>
    </View>
  );
};

const StylingOptions = ({
  editor,
  editorState,
}: { editor: EditorBridge; editorState: BridgeState }) => {
  const isBoldActive = editorState.isBoldActive;
  const isItalicActive = editorState.isItalicActive;
  const isUnderlineActive = editorState.isUnderlineActive;
  const isStrikeActive = editorState.isStrikeActive;
  const isSubscriptActive = editorState.isSubscriptActive;
  const isSuperscriptActive = editorState.isSuperscriptActive;
  return (
    <View style={styles.stylingOptionsOuterContainer}>
      <View style={styles.stylingOptionsContainer}>
        <Pressable
          onPress={editor.toggleBold}
          disabled={!editorState.canToggleBold}
          style={(disabled) => [
            styles.stylingOptionsWrapper,
            {
              backgroundColor: isBoldActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              opacity: !disabled ? 0.5 : 1,
            },
          ]}
        >
          <TextBoldIcon color='white' size={20} strokeWidth={3} />
        </Pressable>
        <Pressable
          onPress={editor.toggleItalic}
          disabled={!editorState.canToggleItalic}
          style={(disabled) => [
            styles.stylingOptionsWrapper,
            {
              backgroundColor: isItalicActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              opacity: !disabled ? 0.5 : 1,
            },
          ]}
        >
          <TextItalicIcon color='white' size={20} strokeWidth={2} />
        </Pressable>
        <Pressable
          onPress={editor.toggleUnderline}
          disabled={!editorState.canToggleUnderline}
          style={(disabled) => [
            styles.stylingOptionsWrapper,
            {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
              aspectRatio: 1,
              backgroundColor: isUnderlineActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              borderRadius: 8,
              borderCurve: 'continuous',
              opacity: !disabled ? 0.5 : 1,
            },
          ]}
        >
          <TextUnderlineIcon
            color='white'
            height={20}
            width={18}
            preserveAspectRatio='none'
            strokeWidth={2}
          />
        </Pressable>
        <Pressable
          onPress={editor.toggleStrike}
          disabled={!editorState.canToggleStrike}
          style={(disabled) => [
            styles.stylingOptionsWrapper,
            {
              backgroundColor: isStrikeActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              opacity: !disabled ? 0.5 : 1,
            },
          ]}
        >
          <TextStrikethroughIcon color='white' size={20} strokeWidth={2} />
        </Pressable>
      </View>
      <View style={styles.stylingOptionsContainer}>
        <Pressable
          onPress={editor.toggleSubscript}
          disabled={!editorState.canToggleSubscript}
          style={(disabled) => [
            styles.stylingOptionsWrapper,
            {
              backgroundColor: isSubscriptActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              opacity: !disabled ? 0.5 : 1,
            },
          ]}
        >
          <TextSubscriptIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={editor.toggleSuperscript}
          disabled={!editorState.canToggleSuperscript}
          style={(disabled) => [
            styles.stylingOptionsWrapper,
            {
              backgroundColor: isSuperscriptActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              opacity: !disabled ? 0.5 : 1,
            },
          ]}
        >
          <TextSuperscriptIcon size={20} color='white' />
        </Pressable>
      </View>
    </View>
  );
};

const BlockOptions = ({
  editor,
  editorState,
}: { editor: EditorBridge; editorState: BridgeState }) => {
  const {
    isBulletListActive,
    isOrderedListActive,
    isBlockquoteActive,
    canToggleBulletList,
    canToggleOrderedList,
    canToggleBlockquote,
    canSink,
    canSinkTaskListItem,
    canLift,
    canLiftTaskListItem,
  } = editorState;

  return (
    <View style={styles.stylingOptionsOuterContainer}>
      <View style={styles.stylingOptionsContainer}>
        <Pressable
          onPress={editor.toggleBulletList}
          disabled={!canToggleBulletList}
          style={[
            styles.stylingOptionsWrapper,
            {
              backgroundColor: isBulletListActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              opacity: !canToggleBulletList ? 0.5 : 1,
            },
          ]}
        >
          <LeftToRightListBulletIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={editor.toggleOrderedList}
          disabled={!canToggleOrderedList}
          style={[
            styles.stylingOptionsWrapper,
            {
              backgroundColor: isOrderedListActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              opacity: !canToggleOrderedList ? 0.5 : 1,
            },
          ]}
        >
          <LeftToRightListNumberIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={() => (canSink ? editor.sink() : editor.sinkTaskListItem())}
          disabled={!canSink && !canSinkTaskListItem}
          style={[
            styles.stylingOptionsWrapper,
            {
              backgroundColor: Colors.dark.secondaryBackground,
              opacity: !canSink && !canSinkTaskListItem ? 0.5 : 1,
            },
          ]}
        >
          <TextIndentMoreIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={() => (canLift ? editor.lift() : editor.liftTaskListItem())}
          disabled={!canLift && !canLiftTaskListItem}
          style={[
            styles.stylingOptionsWrapper,
            {
              backgroundColor: Colors.dark.secondaryBackground,
              opacity: !canLift && !canLiftTaskListItem ? 0.5 : 1,
            },
          ]}
        >
          <TextIndentLessIcon size={20} color='white' />
        </Pressable>
      </View>
      <View style={styles.stylingOptionsContainer}>
        <Pressable
          onPress={editor.toggleBlockquote}
          disabled={!canToggleBlockquote}
          style={[
            styles.stylingOptionsWrapper,
            {
              backgroundColor: isBlockquoteActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              opacity: !canToggleBlockquote ? 0.5 : 1,
            },
          ]}
        >
          <LeftToRightBlockQuoteIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={editor.setHorizontalRule}
          style={[
            styles.stylingOptionsWrapper,
            {
              backgroundColor: Colors.dark.secondaryBackground,
            },
          ]}
        >
          <SolidLine01Icon size={20} color='white' />
        </Pressable>
      </View>
    </View>
  );
};

const ArticleEditorModal = () => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const { height: keyboardHeight, progress } = useReanimatedKeyboardAnimation();
  const { colors, theme } = useTheme();
  const [isFormatting, setIsFormatting] = useState(false);
  const [isAddingContents, setIsAddingContents] = useState(false);
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isYoutubeActive, setIsYoutubeActive] = useState(false);
  const formattingBottomSheetRef = useRef<BottomSheet>(null);
  const contentsBottomSheetRef = useRef<BottomSheet>(null);
  const animatedBottomFormattingSheetPosition = useSharedValue(0);
  const animatedFormattingBottomSheetIndex = useSharedValue(-1);
  const animatedContentsBottomSheetPosition = useSharedValue(0);
  const animatedContentsBottomSheetIndex = useSharedValue(-1);

  const { showActionSheetWithOptions } = useActionSheet();

  const textColor = colors.text;

  const defaultEditorTheme: EditorTheme = {
    toolbar: {} as ToolbarTheme,
    colorKeyboard: defaultColorKeyboardTheme,
    webview: {
      backgroundColor: 'transparent',
    },
    webviewContainer: {},
  };

  const darkEditorTheme: EditorTheme = {
    toolbar: {} as ToolbarTheme,
    colorKeyboard: darkColorKeyboardTheme as ColorKeyboardTheme,
    webview: {
      backgroundColor: 'transparent',
    },
    webviewContainer: {},
  };

  const editorTheme = theme === 'light' ? defaultEditorTheme : darkEditorTheme;

  const editorCss = theme === 'light' ? DEFAULT_EDITOR_CSS : DARK_EDITOR_CSS;

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    bridgeExtensions: [
      CodeBlockBridge,
      NodeHighlightBridge,
      HorizontalRuleBridge,
      SubscriptBridge,
      SuperscriptBridge,
      YouTubeBridge,
      ...TenTapStartKit,
      CoreBridge.configureCSS(editorCss),
    ],
    customSource: editorHtml,
    theme: editorTheme,
  });
  const editorState = editor.getEditorState();
  const isEditorFocused = editorState.isFocused;
  const editorPaddingHorizontal = PixelRatio.roundToNearestPixel(16);
  if (!isEditorFocused) {
    editor.injectCSS(
      `
        .highlight-background {
          background-color: ${colors.editorHighlight};
          border-radius: 4px;
        }
        .tiptap {
          padding: 0 ${editorPaddingHorizontal}px;
        }
        .tiptap pre {
          background: ${colors.border};
          color: ${colors.text};
        }
        .tiptap hr {
          border: none;
          border-top: 1px solid ${colors.border};
          cursor: pointer;
          margin: 2rem 0;
        }

        .tiptap hr.ProseMirror-selectednode {
          border-top: 1px solid ${colors.tint};
        }
        .has-focus {
          background-color: ${colors.editorHighlight};
          box-shadow: 0 0 0 4px ${colors.editorHighlight};
          border-radius: 4px;
        }
          ${editorCss}
        `,
    );
  } else {
    editor.injectCSS(
      `
        .highlight-background {
          background-color: transparent;
          border-radius: 4px;
        }
        .tiptap {
          padding: 0 ${editorPaddingHorizontal}px;
        }
        .tiptap pre {
          background: ${colors.border};
          color: ${colors.text};
        }
        .tiptap hr {
          border: none;
          border-top: 1px solid ${colors.border};
          cursor: pointer;
          margin: 2rem 0;
        }

        .tiptap hr.ProseMirror-selectednode {
          border-top: 1px solid ${colors.tint};
        }
        .has-focus {
          background-color: ${colors.editorHighlight};
          box-shadow: 0 0 0 4px ${colors.editorHighlight};
          border-radius: 4px;
        }
          ${editorCss}
          `,
    );
  }

  editor.injectJS(`document.querySelectorAll('iframe').forEach(iframe => {
  iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
});
`);

  const content = useEditorContent(editor, { type: 'json' });

  useEffect(() => {
    if (editorState.isFocused) {
      formattingBottomSheetRef.current?.close();
      contentsBottomSheetRef.current?.close();
      setIsFormatting(false);
      setIsAddingContents(false);
    }
  }, [editorState.isFocused]);

  const toolbarItems: ToolbarItem[] = [
    {
      onPress: () => () => {
        formattingBottomSheetRef.current?.snapToIndex(0);
        editor.blur();
        setIsFormatting(true);
      },
      active: () => false,
      disabled: () => false,
      icon: <TextFontIcon size={24} color='white' />,
    },
    {
      onPress:
        ({ editor }) =>
        () => {
          editor.toggleBulletList();
        },
      active: ({ editorState }) => editorState.isBulletListActive,
      disabled: ({ editorState }) => !editorState.canToggleBulletList,
      icon: <LeftToRightListBulletIcon size={24} color='white' />,
    },
    {
      onPress: () => () => {
        contentsBottomSheetRef.current?.snapToIndex(0);
        editor.blur();
        setIsAddingContents(true);
      },
      active: () => false,
      disabled: () => false,
      icon: <Add01Icon size={24} color='white' />,
    },
    {
      onPress:
        ({ editor }) =>
        () =>
          editor.undo(),
      active: () => false,
      disabled: ({ editorState }) => !editorState.canUndo,
      icon: (
        <ArrowTurnBackwardIcon
          size={24}
          color='white'
          style={{ transform: [{ rotateX: '180deg' }] }}
        />
      ),
    },
    {
      onPress:
        ({ editor }) =>
        () =>
          editor.redo(),
      active: () => false,
      disabled: ({ editorState }) => !editorState.canRedo,
      icon: (
        <ArrowTurnForwardIcon
          size={24}
          color='white'
          style={{ transform: [{ rotateX: '180deg' }] }}
        />
      ),
    },
    {
      onPress: () => () => {
        editor.blur();
      },
      active: () => false,
      disabled: () => false,
      icon: <ArrowDown01Icon size={24} color='white' />,
    },
  ];

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
  const snapPoints: number[] = [];
  const handleFormattingBottomSheetClose = () => {
    if (isFormatting) {
      editor.focus();
    }
    setIsFormatting(false);
  };

  const handleContentsBottomSheetClose = () => {
    if (isAddingContents) {
      editor.focus();
    }
  };

  const editorMaxHeight = height - headerHeight - insets.top;

  const animatedEditorStyle = useAnimatedStyle(() => {
    if (
      Math.max(
        -keyboardHeight.value,
        editorMaxHeight - animatedBottomFormattingSheetPosition.value,
        editorMaxHeight - animatedContentsBottomSheetPosition.value,
      ) === -keyboardHeight.value
    ) {
      return {
        height:
          editorMaxHeight - 10 + keyboardHeight.value - 44 * progress.value,
        borderBottomLeftRadius: 16 * progress.value,
        borderBottomRightRadius: 16 * progress.value,
      };
    }
    if (
      Math.max(
        -keyboardHeight.value,
        editorMaxHeight - animatedBottomFormattingSheetPosition.value,
        editorMaxHeight - animatedContentsBottomSheetPosition.value,
      ) ===
      editorMaxHeight - animatedBottomFormattingSheetPosition.value
    ) {
      return {
        height: animatedBottomFormattingSheetPosition.value,
        borderBottomLeftRadius:
          11 * (animatedFormattingBottomSheetIndex.value + 1.0) + 1,
        borderBottomRightRadius:
          11 * (animatedFormattingBottomSheetIndex.value + 1.0) + 1,
      };
    }

    return {
      height: animatedContentsBottomSheetPosition.value,
      borderBottomLeftRadius:
        11 * (animatedContentsBottomSheetIndex.value + 1.0) + 1,
      borderBottomRightRadius:
        11 * (animatedContentsBottomSheetIndex.value + 1.0) + 1,
    };
  });

  const animatedToolbarStyle = useAnimatedStyle(() => {
    return {
      height: 44 * progress.value,
    };
  });

  const handlePickImage = async () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      freeStyleCropEnabled: true,
      width: width,
      height: (width / 16) * 9,
      includeBase64: true,
    }).then((image: Image) => {
      editor.setImage(`data:${image.mime};base64,${image.data}`);
      console.log(image);
    });
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
        <View style={styles.flex1} key={2}>
          <View style={styles.editorContainer}>
            <View style={styles.editorUnderlay}>
              <Animated.View
                style={[
                  animatedEditorStyle,
                  {
                    backgroundColor: colors.secondaryBackground,
                    borderCurve: 'continuous',
                  },
                ]}
              >
                <RichText
                  editor={editor}
                  scalesPageToFit
                  style={styles.editor}
                />
              </Animated.View>
            </View>
            <KeyboardStickyView offset={{ closed: 0, opened: 0 }}>
              <Animated.View style={animatedToolbarStyle}>
                <EditorToolbar
                  editor={editor}
                  items={toolbarItems}
                  hidden={false}
                  useLinkActive={{ isLinkActive, setIsLinkActive }}
                  useYoutubeActive={{ isYoutubeActive, setIsYoutubeActive }}
                />
              </Animated.View>
            </KeyboardStickyView>
          </View>
          <BottomSheet
            ref={formattingBottomSheetRef}
            animatedIndex={animatedFormattingBottomSheetIndex}
            animatedPosition={animatedBottomFormattingSheetPosition}
            index={-1}
            snapPoints={snapPoints}
            enableDynamicSizing
            enablePanDownToClose
            handleIndicatorStyle={{
              backgroundColor: colors.secondaryBackground,
            }}
            backgroundComponent={() => <View style={styles.editorUnderlay} />}
            onClose={handleFormattingBottomSheetClose}
          >
            <BottomSheetView
              style={[
                styles.bottomSheetContent,
                { paddingBottom: insets.bottom },
              ]}
            >
              <HeadingOptions editor={editor} editorState={editorState} />
              <StylingOptions editor={editor} editorState={editorState} />
              <BlockOptions editor={editor} editorState={editorState} />
            </BottomSheetView>
          </BottomSheet>
          <BottomSheet
            animatedIndex={animatedContentsBottomSheetIndex}
            animatedPosition={animatedContentsBottomSheetPosition}
            enableDynamicSizing
            enablePanDownToClose
            handleIndicatorStyle={{
              backgroundColor: colors.secondaryBackground,
            }}
            backgroundComponent={() => <View style={styles.editorUnderlay} />}
            index={-1}
            onClose={handleContentsBottomSheetClose}
            ref={contentsBottomSheetRef}
          >
            <BottomSheetView
              style={[
                styles.bottomSheetContent,
                { paddingBottom: insets.bottom },
              ]}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  gap: 12,
                }}
              >
                <View style={{ width: '100%', flexDirection: 'row', gap: 16 }}>
                  <View style={styles.flex1}>
                    <CustomButton
                      backgroundColor={Colors.dark.secondaryBackground}
                      text='ライブラリ'
                      textColor='white'
                      variant='bezeledGray'
                      size='large'
                      icon='Album02Icon'
                      renderIcon={({ size, color }) => (
                        <Album02Icon size={size} color={color} />
                      )}
                      fullWidth
                      onPress={handlePickImage}
                    />
                  </View>
                  <View style={styles.flex1}>
                    <CustomButton
                      backgroundColor={Colors.dark.secondaryBackground}
                      text='アートワーク'
                      textColor='white'
                      variant='bezeledGray'
                      size='large'
                      icon='Vynil03Icon'
                      renderIcon={({ size, color }) => (
                        <Vynil03Icon size={size} color={color} />
                      )}
                      fullWidth
                      onPress={() => {}}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', gap: 16 }}>
                  <View style={styles.flex1}>
                    <CustomButton
                      backgroundColor={Colors.dark.secondaryBackground}
                      text='リンク'
                      textColor='white'
                      variant='bezeledGray'
                      size='large'
                      icon='Link04Icon'
                      disabled={!editorState.canSetLink}
                      colorScheme='dark'
                      renderIcon={({ size, color }) => (
                        <Link04Icon size={size} color={color} />
                      )}
                      fullWidth
                      onPress={() => {
                        setIsLinkActive(true);
                        editor.focus();
                      }}
                    />
                  </View>
                  <View style={styles.flex1}>
                    <CustomButton
                      backgroundColor={Colors.dark.secondaryBackground}
                      text='YouTube'
                      textColor='white'
                      variant='bezeledGray'
                      size='large'
                      icon='YoutubeIcon'
                      renderIcon={({ size, color }) => (
                        <YoutubeIcon size={size} color={color} />
                      )}
                      fullWidth
                      onPress={() => {
                        setIsYoutubeActive(true);
                        editor.focus();
                      }}
                    />
                  </View>
                </View>
              </View>
            </BottomSheetView>
          </BottomSheet>
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
  editorContainer: {
    flex: 1,
  },
  editor: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headingOptionsContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  headingOptionWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderCurve: 'continuous',
    borderRadius: 8,
  },
  headingText: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white',
  },
  textSubhead: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
  textBody: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
  },
  textCallout: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
  },
  monoText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  stylingOptionsOuterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  stylingOptionsContainer: { flexDirection: 'row', gap: 8 },
  stylingOptionsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderCurve: 'continuous',
    borderRadius: 8,
  },
  bottomSheetContent: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 24,
    gap: 8,
  },
  editorUnderlay: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentsOptionWrapper: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 12,
    borderCurve: 'continuous',
    borderRadius: 12,
    gap: 8,
  },
  contentsOptionContainer: {
    flex: 1,
    gap: 8,
  },
  playerContainer: {
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    height: 20,
    padding: 4,
    borderCurve: 'continuous',
    borderRadius: 8,
    gap: 4,
  },
});
