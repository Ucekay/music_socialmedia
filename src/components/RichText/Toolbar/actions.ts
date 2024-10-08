import {} from 'react';
import { Platform } from 'react-native';

import { EditorActionType, Images } from '@10play/tentap-editor';

import { ToolbarContext } from './ToolbarContext';

import type { BridgeState, EditorBridge } from '@10play/tentap-editor';

export const ToolbarItems = {
  ...EditorActionType,
  ToggleH1: 'toggle-h1',
  ToggleH2: 'toggle-h2',
  ToggleH3: 'toggle-h3',
  ToggleH4: 'toggle-h4',
  ToggleH5: 'toggle-h5',
  ToggleH6: 'toggle-h6',
} as const;

type ArgsToolbarCB = {
  editor: EditorBridge;
  editorState: BridgeState;
  setToolbarContext: React.Dispatch<React.SetStateAction<ToolbarContext>>;
  toolbarContext: ToolbarContext;
};
export interface ToolbarItem {
  onPress: ({ editor, editorState }: ArgsToolbarCB) => () => void;
  active: ({ editor, editorState }: ArgsToolbarCB) => boolean;
  disabled: ({ editor, editorState }: ArgsToolbarCB) => boolean;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  image: ({ editor, editorState }: ArgsToolbarCB) => any;
  key: string;
}

export const DEFAULT_TOOLBAR_ITEMS: ToolbarItem[] = [
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleBold(),
    active: ({ editorState }) => editorState.isBoldActive,
    disabled: ({ editorState }) => !editorState.canToggleBold,
    image: () => Images.bold,
    key: 'bold',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleItalic(),
    active: ({ editorState }) => editorState.isItalicActive,
    disabled: ({ editorState }) => !editorState.canToggleItalic,
    image: () => Images.italic,
    key: 'italic',
  },
  {
    onPress:
      ({ setToolbarContext, editorState, editor }) =>
      () => {
        if (Platform.OS === 'android') {
          // On android focus outside the editor will lose the tiptap selection so we wait for the next tick and set it with the last selection value we had
          setTimeout(() => {
            editor.setSelection(
              editorState.selection.from,
              editorState.selection.to,
            );
          });
        }
        setToolbarContext(ToolbarContext.Link);
      },
    active: ({ editorState }) => editorState.isLinkActive,
    disabled: ({ editorState }) =>
      !editorState.isLinkActive && !editorState.canSetLink,
    image: () => Images.link,
    key: 'link',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleTaskList(),
    active: ({ editorState }) => editorState.isTaskListActive,
    disabled: ({ editorState }) => !editorState.canToggleTaskList,
    image: () => Images.checkList,
    key: 'taskList',
  },
  {
    onPress:
      ({ setToolbarContext }) =>
      () =>
        setToolbarContext(ToolbarContext.Heading),
    active: () => false,
    disabled: ({ editorState }) => !editorState.canToggleHeading,
    image: () => Images.Aa,
    key: 'heading',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleCode(),
    active: ({ editorState }) => editorState.isCodeActive,
    disabled: ({ editorState }) => !editorState.canToggleCode,
    image: () => Images.code,
    key: 'code',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleUnderline(),
    active: ({ editorState }) => editorState.isUnderlineActive,
    disabled: ({ editorState }) => !editorState.canToggleUnderline,
    image: () => Images.underline,
    key: 'underline',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleStrike(),
    active: ({ editorState }) => editorState.isStrikeActive,
    disabled: ({ editorState }) => !editorState.canToggleStrike,
    image: () => Images.strikethrough,
    key: 'strike',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleBlockquote(),
    active: ({ editorState }) => editorState.isBlockquoteActive,
    disabled: ({ editorState }) => !editorState.canToggleBlockquote,
    image: () => Images.quote,
    key: 'blockquote',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleOrderedList(),
    active: ({ editorState }) => editorState.isOrderedListActive,
    disabled: ({ editorState }) => !editorState.canToggleOrderedList,
    image: () => Images.orderedList,
    key: 'orderedList',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleBulletList(),
    active: ({ editorState }) => editorState.isBulletListActive,
    disabled: ({ editorState }) => !editorState.canToggleBulletList,
    image: () => Images.bulletList,
    key: 'bulletList',
  },
  {
    // Regular list items (li) and task list items both use the
    // same sink command and button just with a different parameter, so we check both states here
    onPress:
      ({ editor, editorState }) =>
      () =>
        editorState.canSink ? editor.sink() : editor.sinkTaskListItem(),
    active: () => false,
    disabled: ({ editorState }) =>
      !editorState.canSink && !editorState.canSinkTaskListItem,
    image: () => Images.indent,
    key: 'indent',
  },
  {
    // Regular list items (li) and task list items both use the
    // same lift command and button just with a different parameter, so we check both states here
    onPress:
      ({ editor, editorState }) =>
      () =>
        editorState.canLift ? editor.lift() : editor.liftTaskListItem(),
    active: () => false,
    disabled: ({ editorState }) =>
      !editorState.canLift && !editorState.canLiftTaskListItem,
    image: () => Images.outdent,
    key: 'outdent',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.undo(),
    active: () => false,
    disabled: ({ editorState }) => !editorState.canUndo,
    image: () => Images.undo,
    key: 'undo',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.redo(),
    active: () => false,
    disabled: ({ editorState }) => !editorState.canRedo,
    image: () => Images.redo,
    key: 'redo',
  },
];

export const YouTube: ToolbarItem = {
  onPress:
    ({ setToolbarContext, editorState, editor }) =>
    () => {
      setToolbarContext(ToolbarContext.YoutubeVideo);
    },
  active: () => false,
  disabled: () => false,
  image: () => Images.link,
  key: 'youtube',
};

export const Format: ToolbarItem = {
  onPress: () => () => {},
  active: () => false,
  disabled: () => false,
  image: () => Images.Aa,
  key: 'format',
};

export const HEADING_ITEMS: ToolbarItem[] = [
  {
    onPress:
      ({ setToolbarContext }) =>
      () =>
        setToolbarContext(ToolbarContext.Main),
    active: () => false,
    disabled: () => false,
    image: () => Images.close,
    key: 'close',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleHeading(1),
    active: ({ editorState }) => editorState.headingLevel === 1,
    disabled: ({ editorState }) => !editorState.canToggleHeading,
    image: () => Images.h1,
    key: 'h1',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleHeading(2),
    active: ({ editorState }) => editorState.headingLevel === 2,
    disabled: ({ editorState }) => !editorState.canToggleHeading,
    image: () => Images.h2,
    key: 'h2',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleHeading(3),
    active: ({ editorState }) => editorState.headingLevel === 3,
    disabled: ({ editorState }) => !editorState.canToggleHeading,
    image: () => Images.h3,
    key: 'h3',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleHeading(4),
    active: ({ editorState }) => editorState.headingLevel === 4,
    disabled: ({ editorState }) => !editorState.canToggleHeading,
    image: () => Images.h4,
    key: 'h4',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleHeading(5),
    active: ({ editorState }) => editorState.headingLevel === 5,
    disabled: ({ editorState }) => !editorState.canToggleHeading,
    image: () => Images.h5,
    key: 'h5',
  },
  {
    onPress:
      ({ editor }) =>
      () =>
        editor.toggleHeading(6),
    active: ({ editorState }) => editorState.headingLevel === 6,
    disabled: ({ editorState }) => !editorState.canToggleHeading,
    image: () => Images.h6,
    key: 'h6',
  },
];
