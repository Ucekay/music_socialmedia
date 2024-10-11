import { BridgeExtension } from '@10play/tentap-editor';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';

type HorizontalRuleEditorState = {
  canSetHorizontalRule: boolean;
};

type HorizontalRuleEditorInstance = {
  setHorizontalRule: () => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends HorizontalRuleEditorState {}
  interface EditorBridge extends HorizontalRuleEditorInstance {}
}

export enum HorizontalRuleEditorActionType {
  SetHorizontalRule = 'set-horizontal-rule',
}

type HorizontalRuleMessage = {
  type: HorizontalRuleEditorActionType.SetHorizontalRule;
  payload?: undefined;
};

export const HorizontalRuleBridge = new BridgeExtension<
  HorizontalRuleEditorState,
  HorizontalRuleEditorInstance,
  HorizontalRuleMessage
>({
  tiptapExtension: HorizontalRule,
  onBridgeMessage: (editor, message) => {
    if (message.type === HorizontalRuleEditorActionType.SetHorizontalRule) {
      editor.chain().focus().setHorizontalRule().run();
    }

    return false;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      setHorizontalRule: () =>
        sendBridgeMessage({
          type: HorizontalRuleEditorActionType.SetHorizontalRule,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canSetHorizontalRule: editor.can().setHorizontalRule(),
    };
  },
});
