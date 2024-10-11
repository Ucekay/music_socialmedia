import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import {
  type EditorBridge,
  useBridgeState,
  useKeyboard,
} from '@10play/tentap-editor';

import Colors from '@/src/constants/Colors';

import { ToolbarContext } from './RichText/Toolbar/ToolbarContext';

import type { ToolbarItem } from './RichText/Toolbar/actions';

interface EditorToolbarProps {
  editor: EditorBridge;
  hidden?: boolean;
  items: ToolbarItem[];
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
}: EditorToolbarProps) => {
  const editorState = useBridgeState(editor);
  const { isKeyboardUp } = useKeyboard();
  const [toolbarContext, setToolbarContext] = useState<ToolbarContext>(
    ToolbarContext.Main,
  );

  const args = {
    editor,
    editorState,
    setToolbarContext,
    toolbarContext,
  };

  const hideToolbar =
    hidden === undefined ? !isKeyboardUp || !editorState.isFocused : hidden;

  if (hideToolbar) return null;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 44,
    paddingHorizontal: 16,
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
