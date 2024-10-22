import { BridgeExtension } from '@10play/tentap-editor';
import Subscript from '@tiptap/extension-subscript';

type SubscriptEditorState = {
  isSubscriptActive: boolean;
  canToggleSubscript: boolean;
};

type SubscriptEditorInstance = {
  toggleSubscript: () => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends SubscriptEditorState {}
  interface EditorBridge extends SubscriptEditorInstance {}
}

export enum SubscriptEditorActionType {
  ToggleSubscript = 'toggle-subscript',
}

type SubscriptMessage = {
  type: SubscriptEditorActionType.ToggleSubscript;
  payload?: undefined;
};

export const SubscriptBridge = new BridgeExtension<
  SubscriptEditorState,
  SubscriptEditorInstance,
  SubscriptMessage
>({
  tiptapExtension: Subscript,
  onBridgeMessage: (editor, message) => {
    if (message.type === SubscriptEditorActionType.ToggleSubscript) {
      editor.chain().focus().toggleSubscript().run();
    }

    return false;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      toggleSubscript: () =>
        sendBridgeMessage({ type: SubscriptEditorActionType.ToggleSubscript }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canToggleSubscript: editor.can().toggleSubscript(),
      isSubscriptActive: editor.isActive('subscript'),
    };
  },
});
