import { BridgeExtension } from '@10play/tentap-editor';
import Superscript from '@tiptap/extension-superscript';

type SuperscriptEditorState = {
  isSuperscriptActive: boolean;
  canToggleSuperscript: boolean;
};

type SuperscriptEditorInstance = {
  toggleSuperscript: () => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends SuperscriptEditorState {}
  interface EditorBridge extends SuperscriptEditorInstance {}
}

export enum SuperscriptEditorActionType {
  ToggleSuperscript = 'toggle-superscript',
}

type SuperscriptMessage = {
  type: SuperscriptEditorActionType.ToggleSuperscript;
  payload?: undefined;
};

export const SuperscriptBridge = new BridgeExtension<
  SuperscriptEditorState,
  SuperscriptEditorInstance,
  SuperscriptMessage
>({
  tiptapExtension: Superscript,
  onBridgeMessage: (editor, message) => {
    if (message.type === SuperscriptEditorActionType.ToggleSuperscript) {
      editor.chain().focus().toggleSuperscript().run();
    }

    return false;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      toggleSuperscript: () =>
        sendBridgeMessage({
          type: SuperscriptEditorActionType.ToggleSuperscript,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canToggleSuperscript: editor.can().toggleSuperscript(),
      isSuperscriptActive: editor.isActive('superscript'),
    };
  },
});
