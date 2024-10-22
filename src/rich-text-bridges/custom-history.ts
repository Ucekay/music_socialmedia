import { BridgeExtension } from '@10play/tentap-editor';

import { CustomHistory } from '../tiptap-extensions/custom-history';

type CustomHistoryEditorState = {
  canUndo: boolean;
  canRedo: boolean;
};

type CustomHistoryEditorInstance = {
  undo: () => void;
  redo: () => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends CustomHistoryEditorState {}
  interface EditorBridge extends CustomHistoryEditorInstance {}
}

export enum CustomHistoryEditorActionType {
  Undo = 'undo',
  Redo = 'redo',
}

type CustomHistoryMessage = {
  type: CustomHistoryEditorActionType.Undo | CustomHistoryEditorActionType.Redo;
  payload?: undefined;
};

export const CustomHistoryBridge = new BridgeExtension<
  CustomHistoryEditorState,
  CustomHistoryEditorInstance,
  CustomHistoryMessage
>({
  tiptapExtension: CustomHistory.configure({
    selectTransactions: (tr) => !tr.getMeta('nodeHighlight'),
  }),
  onBridgeMessage: (editor, message) => {
    if (message.type === CustomHistoryEditorActionType.Undo) {
      editor.chain().focus().undo().run();
    }
    if (message.type === CustomHistoryEditorActionType.Redo) {
      editor.chain().focus().redo().run();
    }

    return false;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    const undo = () =>
      sendBridgeMessage({ type: CustomHistoryEditorActionType.Undo });
    const redo = () =>
      sendBridgeMessage({ type: CustomHistoryEditorActionType.Redo });
    return {
      redo,
      undo,
    };
  },
  extendEditorState: (editor) => {
    return {
      canUndo: editor.can().undo(),
      canRedo: editor.can().redo(),
    };
  },
});
