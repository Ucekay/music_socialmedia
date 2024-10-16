import { BridgeExtension } from '@10play/tentap-editor';

import { NodeHighlight } from '../tiptap-extensions/extension-focus';

type NodeHighlightEditorState = {
  isNodeHighlightActive: boolean;
};

type NodeHighlightEditorInstance = {
  setNodeHighlight: () => void;
  unsetNodeHighlight: () => void;
  toggleNodeHighlight: () => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends NodeHighlightEditorState {}
  interface EditorBridge extends NodeHighlightEditorInstance {}
}

export enum NodeHighlightEditorActionType {
  SetNodeHighlight = 'set-node-highlight',
  UnsetNodeHighlight = 'unset-node-highlight',
  ToggleNodeHighlight = 'toggle-node-highlight',
}

type NodeHighlightMessage =
  | {
      type: NodeHighlightEditorActionType.SetNodeHighlight;
      payload?: undefined;
    }
  | {
      type: NodeHighlightEditorActionType.UnsetNodeHighlight;
      payload?: undefined;
    }
  | {
      type: NodeHighlightEditorActionType.ToggleNodeHighlight;
      payload?: undefined;
    };

export const NodeHighlightBridge = new BridgeExtension<
  NodeHighlightEditorState,
  NodeHighlightEditorInstance,
  NodeHighlightMessage
>({
  tiptapExtension: NodeHighlight.configure({
    className: 'has-focus',
    types: ['paragraph', 'heading', 'codeBlock'],
  }),
  onBridgeMessage: (editor, message) => {
    switch (message.type) {
      case NodeHighlightEditorActionType.SetNodeHighlight:
        editor.chain().setNodeHighlight().run();
        break;
      case NodeHighlightEditorActionType.UnsetNodeHighlight:
        editor.chain().unsetNodeHighlight().run();
        break;
      case NodeHighlightEditorActionType.ToggleNodeHighlight:
        editor.chain().toggleNodeHighlight().run();
        break;
      default:
        return false;
    }

    return true;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      setNodeHighlight: () =>
        sendBridgeMessage({
          type: NodeHighlightEditorActionType.SetNodeHighlight,
        }),
      unsetNodeHighlight: () =>
        sendBridgeMessage({
          type: NodeHighlightEditorActionType.UnsetNodeHighlight,
        }),
      toggleNodeHighlight: () =>
        sendBridgeMessage({
          type: NodeHighlightEditorActionType.ToggleNodeHighlight,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {
      isNodeHighlightActive: editor.isActive('focus'),
    };
  },
});
