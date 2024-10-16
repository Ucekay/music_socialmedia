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
import { BottomSheetView } from '@gorhom/bottom-sheet';
import BottomSheet from '@gorhom/bottom-sheet';
import { useHeaderHeight } from '@react-navigation/elements';
import { StatusBar } from 'expo-status-bar';
import {
  Add01Icon,
  ArrowDown01Icon,
  ArrowTurnBackwardIcon,
  ArrowTurnForwardIcon,
  LeftToRightBlockQuoteIcon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
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
} from 'hugeicons-react-native';
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
    `;
const DARK_EDITOR_CSS = `
  *{
    color: white;
    background-color: transparent;
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

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Pressable
        onPress={() => {
          deactivateCodeBlock();
          editor.toggleHeading(2);
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            headingLevel === 2 ? Colors.dark.tint : 'transparent',
          height: 44,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          borderCurve: 'continuous',
        }}
      >
        <RNText
          style={{
            fontSize: 22,
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
          }}
        >
          見出し
        </RNText>
      </Pressable>
      <Pressable
        onPress={() => {
          deactivateCodeBlock();
          editor.toggleHeading(3);
        }}
        style={{
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            headingLevel === 3 ? Colors.dark.tint : 'transparent',
          paddingHorizontal: 12,
          borderRadius: 8,
          borderCurve: 'continuous',
        }}
      >
        <RNText
          style={{
            fontSize: 20,
            textAlign: 'center',
            color: 'white',
            fontWeight: '500',
          }}
        >
          小見出し
        </RNText>
      </Pressable>
      <Pressable
        onPress={() => {
          if (headingLevel !== undefined) {
            editor.toggleHeading(headingLevel as Level);
          }
          deactivateCodeBlock();
        }}
        style={{
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            headingLevel === undefined && !isCodeBlockActive
              ? Colors.dark.tint
              : 'transparent',
          paddingHorizontal: 12,
          borderRadius: 8,
          borderCurve: 'continuous',
        }}
      >
        <RNText
          style={{
            fontSize: 17,
            textAlign: 'center',
            color: 'white',
          }}
        >
          本文
        </RNText>
      </Pressable>
      <Pressable
        onPress={() => {
          if (headingLevel !== undefined) {
            editor.toggleHeading(headingLevel as Level);
          }
          if (isCodeBlockActive) {
            editor.setHardBreak();
          } else {
            editor.toggleCodeBlock();
          }
        }}
        style={{
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isCodeBlockActive ? Colors.dark.tint : 'transparent',
          paddingHorizontal: 12,
          borderRadius: 8,
          borderCurve: 'continuous',
        }}
      >
        <RNText
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: 'white',
          }}
        >
          等幅
        </RNText>
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
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable
          onPress={editor.toggleBold}
          disabled={!editorState.canToggleBold}
          style={(disabled) => {
            return {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
              aspectRatio: 1,
              backgroundColor: isBoldActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              borderRadius: 8,
              borderCurve: 'continuous',
              opacity: !disabled ? 0.5 : 1,
            };
          }}
        >
          <TextBoldIcon color='white' size={20} strokeWidth={3} />
        </Pressable>
        <Pressable
          onPress={editor.toggleItalic}
          disabled={!editorState.canToggleItalic}
          style={(disabled) => {
            return {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
              aspectRatio: 1,
              backgroundColor: isItalicActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              borderRadius: 8,
              borderCurve: 'continuous',
              opacity: !disabled ? 0.5 : 1,
            };
          }}
        >
          <TextItalicIcon color='white' size={20} strokeWidth={2} />
        </Pressable>
        <Pressable
          onPress={editor.toggleUnderline}
          disabled={!editorState.canToggleUnderline}
          style={(disabled) => {
            return {
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
            };
          }}
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
          style={(disabled) => {
            return {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
              aspectRatio: 1,
              backgroundColor: isStrikeActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              borderRadius: 8,
              borderCurve: 'continuous',
              opacity: !disabled ? 0.5 : 1,
            };
          }}
        >
          <TextStrikethroughIcon color='white' size={20} strokeWidth={2} />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable
          onPress={editor.toggleSubscript}
          disabled={!editorState.canToggleSubscript}
          style={(disabled) => {
            return {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
              aspectRatio: 1,
              backgroundColor: isSubscriptActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              borderRadius: 8,
              borderCurve: 'continuous',
              opacity: !disabled ? 0.5 : 1,
            };
          }}
        >
          <TextSubscriptIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={editor.toggleSuperscript}
          disabled={!editorState.canToggleSuperscript}
          style={(disabled) => {
            return {
              justifyContent: 'center',
              alignItems: 'center',
              padding: 12,
              aspectRatio: 1,
              backgroundColor: isSuperscriptActive
                ? Colors.dark.tint
                : Colors.dark.secondaryBackground,
              borderRadius: 8,
              borderCurve: 'continuous',
              opacity: !disabled ? 0.5 : 1,
            };
          }}
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
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
        }}
      >
        <Pressable
          onPress={editor.toggleBulletList}
          disabled={!canToggleBulletList}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            aspectRatio: 1,
            backgroundColor: isBulletListActive
              ? Colors.dark.tint
              : Colors.dark.secondaryBackground,
            borderRadius: 8,
            borderCurve: 'continuous',
            opacity: !canToggleBulletList ? 0.5 : 1,
          }}
        >
          <LeftToRightListBulletIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={editor.toggleOrderedList}
          disabled={!canToggleOrderedList}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            aspectRatio: 1,
            backgroundColor: isOrderedListActive
              ? Colors.dark.tint
              : Colors.dark.secondaryBackground,
            borderRadius: 8,
            borderCurve: 'continuous',
            opacity: !canToggleOrderedList ? 0.5 : 1,
          }}
        >
          <LeftToRightListNumberIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={() => (canSink ? editor.sink() : editor.sinkTaskListItem())}
          disabled={!canSink && !canSinkTaskListItem}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            aspectRatio: 1,
            backgroundColor: Colors.dark.secondaryBackground,
            borderRadius: 8,
            borderCurve: 'continuous',
            opacity: !canSink && !canSinkTaskListItem ? 0.5 : 1,
          }}
        >
          <TextIndentMoreIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={() => (canLift ? editor.lift() : editor.liftTaskListItem())}
          disabled={!canLift && !canLiftTaskListItem}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            aspectRatio: 1,
            backgroundColor: Colors.dark.secondaryBackground,
            borderRadius: 8,
            borderCurve: 'continuous',
            opacity: !canLift && !canLiftTaskListItem ? 0.5 : 1,
          }}
        >
          <TextIndentLessIcon size={20} color='white' />
        </Pressable>
      </View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Pressable
          onPress={editor.toggleBlockquote}
          disabled={!canToggleBlockquote}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            aspectRatio: 1,
            backgroundColor: isBlockquoteActive
              ? Colors.dark.tint
              : Colors.dark.secondaryBackground,
            borderRadius: 8,
            borderCurve: 'continuous',
            opacity: !canToggleBlockquote ? 0.5 : 1,
          }}
        >
          <LeftToRightBlockQuoteIcon size={20} color='white' />
        </Pressable>
        <Pressable
          onPress={editor.setHorizontalRule}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            aspectRatio: 1,
            backgroundColor: Colors.dark.secondaryBackground,
            borderRadius: 8,
            borderCurve: 'continuous',
          }}
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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const animatedBottomSheetPosition = useSharedValue(0);
  const animatedBottomSheetIndex = useSharedValue(-1);

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
      bottomSheetRef.current?.close();
    }
  }, [editorState.isFocused]);

  const toolbarItems: ToolbarItem[] = [
    {
      onPress: () => () => {
        bottomSheetRef.current?.snapToIndex(0);
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
        editor.blur();
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
  const handleBottomSheetClose = () => {
    if (isFormatting) {
      editor.focus();
    }
    setIsFormatting(false);
  };

  const animatedEditorStyle = useAnimatedStyle(() => {
    if (-keyboardHeight.value > height - animatedBottomSheetPosition.value) {
      return {
        height:
          height -
          (headerHeight + insets.top + 10) +
          keyboardHeight.value -
          44 * progress.value,
        borderBottomLeftRadius: 16 * progress.value,
        borderBottomRightRadius: 16 * progress.value,
      };
    }
    return {
      height: animatedBottomSheetPosition.value,
      borderBottomLeftRadius: 16 * animatedBottomSheetIndex.value + 12,
      borderBottomRightRadius: 16 * animatedBottomSheetIndex.value + 12,
    };
  });

  const animatedToolbarStyle = useAnimatedStyle(() => {
    return {
      height: 44 * progress.value,
    };
  });

  return (
    <BgView style={{ flex: 1 }}>
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
      <PagerView style={{ flex: 1 }} initialPage={0}>
        <View key={1}>
          <ArticleConfigScreen />
        </View>
        <View key={2}>
          <View style={[styles.editorContainer]}>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
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
                />
              </Animated.View>
            </KeyboardStickyView>
          </View>
          <BottomSheet
            ref={bottomSheetRef}
            animatedIndex={animatedBottomSheetIndex}
            animatedPosition={animatedBottomSheetPosition}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose
            enableDynamicSizing
            backgroundComponent={() => (
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'black',
                }}
              />
            )}
            onClose={handleBottomSheetClose}
          >
            <BottomSheetView
              style={{
                flex: 1,
                paddingHorizontal: 24,
                alignItems: 'center',
                paddingBottom: insets.bottom,
                gap: 8,
              }}
            >
              <HeadingOptions editor={editor} editorState={editorState} />
              <StylingOptions editor={editor} editorState={editorState} />
              <BlockOptions editor={editor} editorState={editorState} />
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
  keyboardAvoidingView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
