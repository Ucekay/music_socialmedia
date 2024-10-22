import { useRef, useState } from 'react';
import { Button, Pressable, StyleSheet, TextInput, View } from 'react-native';

import {
  type EditorBridge,
  useBridgeState,
  useKeyboard,
} from '@10play/tentap-editor';
import { ArrowLeft01Icon, CancelCircleIcon } from 'hugeicons-react-native';

import Colors from '@/src/constants/Colors';

import { ToolbarContext } from './RichText/Toolbar/ToolbarContext';

import type { ToolbarItem } from './RichText/Toolbar/actions';

interface EditorToolbarProps {
  editor: EditorBridge;
  hidden?: boolean;
  items: ToolbarItem[];
  useLinkActive: {
    isLinkActive: boolean;
    setIsLinkActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
  useYoutubeActive: {
    isYoutubeActive: boolean;
    setIsYoutubeActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface ToolbarItemProps extends ToolbarItem {
  editor: EditorBridge;
  args: Parameters<ToolbarItem['onPress']>[0];
}

const ToolbarItemComp = ({
  onPress,
  disabled,
  active,
  icon,
  editor,
  args,
}: ToolbarItem & {
  editor: EditorBridge;
  args: Parameters<ToolbarItem['onPress']>[0];
}) => {
  return (
    <Pressable
      onPress={onPress(args)}
      disabled={disabled(args)}
      style={({ pressed }) => [
        { padding: 8 },
        disabled(args) ? { opacity: 0.5 } : undefined,
        pressed ? { opacity: 0.5 } : undefined,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          active(args)
            ? { backgroundColor: Colors.dark.secondaryBackground }
            : undefined,
        ]}
      >
        {icon}
      </View>
    </Pressable>
  );
};

const EditorToolbar = ({
  editor,
  hidden = undefined,
  items,
  useLinkActive,
  useYoutubeActive,
}: EditorToolbarProps) => {
  const editorState = useBridgeState(editor);
  const { isKeyboardUp } = useKeyboard();
  const [toolbarContext, setToolbarContext] = useState<ToolbarContext>(
    ToolbarContext.Main,
  );
  const [link, setLink] = useState('');
  const textInputRef = useRef<TextInput>(null);

  const args = {
    editor,
    editorState,
    setToolbarContext,
    toolbarContext,
  };

  const hideToolbar =
    hidden === undefined ? !isKeyboardUp || !editorState.isFocused : hidden;

  if (hideToolbar) return null;

  if (useLinkActive.isLinkActive || useYoutubeActive.isYoutubeActive) {
    return (
      <View style={styles.toolbar}>
        <Pressable
          onPress={() => {
            textInputRef.current?.clear();
            useLinkActive.setIsLinkActive(false);
            useYoutubeActive.setIsYoutubeActive(false);
          }}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <ArrowLeft01Icon size={20} color='white' />
        </Pressable>
        <View style={{ flex: 1, padding: 8 }}>
          <View
            style={{
              flex: 1,
              borderRadius: 4,
              borderCurve: 'continuous',
              flexDirection: 'row',
              backgroundColor: Colors.dark.secondaryBackground,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                color: 'white',
                paddingHorizontal: 8,
              }}
              autoCapitalize='none'
              autoCorrect={false}
              autoFocus={true}
              placeholder='Enter URL'
              placeholderTextColor='rgba(255, 255, 255, 0.5)'
              ref={textInputRef}
              value={link}
              onChangeText={setLink}
            />
            <Pressable
              onPress={() => textInputRef.current?.clear()}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                padding: 8,
              }}
            >
              <CancelCircleIcon size={16} color='white' />
            </Pressable>
          </View>
        </View>
        <Button
          color={'white'}
          title='挿入'
          onPress={() => {
            useLinkActive.setIsLinkActive(false);
            useLinkActive.isLinkActive && editor.setLink(link);
            useYoutubeActive.isYoutubeActive && editor.setYoutubeVideo(link);
            textInputRef.current?.clear();
            editor.focus();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.toolbar}>
      <View style={{ flexDirection: 'row' }}>
        <ToolbarItemComp editor={editor} args={args} {...items[0]} />
        <ToolbarItemComp editor={editor} args={args} {...items[1]} />
        <ToolbarItemComp editor={editor} args={args} {...items[2]} />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <ToolbarItemComp editor={editor} args={args} {...items[3]} />
        <ToolbarItemComp editor={editor} args={args} {...items[4]} />
      </View>
      <ToolbarItemComp editor={editor} args={args} {...items[5]} />
    </View>
  );
};

export default EditorToolbar;

const styles = StyleSheet.create({
  toolbar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 44,
    paddingHorizontal: 16,
    gap: 8,
  },
  toolbarItem: {
    height: 44,
    padding: 8,
    aspectRatio: 1,
  },
  disabledToolbarItem: {
    opacity: 0.3,
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    borderCurve: 'continuous',
    borderRadius: 4,
  },
});
