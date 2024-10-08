import React from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';

import { useBridgeState, useKeyboard } from '@10play/tentap-editor';
import { EditLinkBar } from '@10play/tentap-editor/src/RichText/Toolbar/EditLinkBar';

import { EditYoutubeLinkBar } from './EditYoutubeLinkBar';
import { ToolbarContext } from './ToolbarContext';
import { ToolbarItemComp } from './ToolbaritemComp';
import { WebToolbar } from './WebToolbar';
import { DEFAULT_TOOLBAR_ITEMS, HEADING_ITEMS } from './actions';

import type { EditorBridge } from '@10play/tentap-editor';
import type { ToolbarItem } from './actions';

interface ToolbarProps {
  editor: EditorBridge;
  hidden?: boolean;
  items?: ToolbarItem[];
}

export const toolbarStyles = StyleSheet.create({});

export function Toolbar({
  editor,
  hidden = undefined,
  items = DEFAULT_TOOLBAR_ITEMS,
}: ToolbarProps) {
  const editorState = useBridgeState(editor);
  const { isKeyboardUp } = useKeyboard();
  const [toolbarContext, setToolbarContext] = React.useState<ToolbarContext>(
    ToolbarContext.Main,
  );

  const hideToolbar =
    hidden === undefined ? !isKeyboardUp || !editorState.isFocused : hidden;

  const args = {
    editor,
    editorState,
    setToolbarContext,
    toolbarContext,
  };

  switch (toolbarContext) {
    case ToolbarContext.Main:
    case ToolbarContext.Heading:
      if (Platform.OS === 'web') {
        return (
          <WebToolbar
            items={
              toolbarContext === ToolbarContext.Main ? items : HEADING_ITEMS
            }
            args={args}
            editor={editor}
            hidden={hidden}
          />
        );
      }
      return (
        <FlatList
          data={toolbarContext === ToolbarContext.Main ? items : HEADING_ITEMS}
          style={[editor.theme.toolbar.toolbarBody]}
          renderItem={({ item }) => {
            return <ToolbarItemComp {...item} args={args} editor={editor} />;
          }}
          horizontal
        />
      );
    case ToolbarContext.Link:
      return (
        <EditLinkBar
          theme={editor.theme}
          initialLink={editorState.activeLink}
          onBlur={() => setToolbarContext(ToolbarContext.Main)}
          onLinkIconClick={() => {
            setToolbarContext(ToolbarContext.Main);
            editor.focus();
          }}
          onEditLink={(link) => {
            editor.setLink(link);
            editor.focus();

            if (Platform.OS === 'android') {
              // On android we dont want to hide the link input before we finished focus on editor
              // Add here 100ms and we can try to find better solution later
              setTimeout(() => {
                setToolbarContext(ToolbarContext.Main);
              }, 100);
            } else {
              setToolbarContext(ToolbarContext.Main);
            }
          }}
        />
      );
    case ToolbarContext.YoutubeVideo:
      return (
        <EditYoutubeLinkBar
          theme={editor.theme}
          onBlur={() => setToolbarContext(ToolbarContext.Main)}
          onLinkIconClick={() => {
            setToolbarContext(ToolbarContext.Main);
            editor.focus();
          }}
          onEditLink={(link) => {
            editor.setYoutubeVideo(link);
            editor.focus();

            if (Platform.OS === 'android') {
              // On android we dont want to hide the link input before we finished focus on editor
              // Add here 100ms and we can try to find better solution later
              setTimeout(() => {
                setToolbarContext(ToolbarContext.Main);
              }, 100);
            } else {
              setToolbarContext(ToolbarContext.Main);
            }
          }}
        />
      );
  }
}
