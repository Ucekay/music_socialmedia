import { BridgeExtension } from '@10play/tentap-editor';
import HorizontalRule from '@tiptap/extension-horizontal-rule';

type HorizontalRuleEditorState = {
  isHorizontalRuleActive: boolean;
  canToggleHorizontalRule: boolean;
};

type HorizontalRuleEditorInstance = {
  toggleHorizontalRule: () => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends HorizontalRuleEditorState {}
  interface EditorBridge extends HorizontalRuleEditorInstance {}
}

export enum HorizontalRuleEditorActionType {
  ToggleHorizontalRule = 'toggle-horizontal-rule',
}

type HorizontalRuleMessage = {
  type: HorizontalRuleEditorActionType.ToggleHorizontalRule;
  payload?: undefined;
};

export const HorizontalRuleBridge = new BridgeExtension<
  HorizontalRuleEditorState,
  HorizontalRuleEditorInstance,
  HorizontalRuleMessage
>({
  tiptapExtension: HorizontalRule,
  onBridgeMessage: (editor, message) => {
    if (message.type === HorizontalRuleEditorActionType.ToggleHorizontalRule) {
      editor.chain().focus().toggleHorizontalRule().run();
    }

    return false;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      toggleHorizontalRule: () =>
        sendBridgeMessage({
          type: HorizontalRuleEditorActionType.ToggleHorizontalRule,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canToggleHorizontalRule: editor.can().toggleHorizontalRule(),
      isHorizontalRuleActive: editor.isActive('horizontalRule'),
    };
  },
  extendCSS: `
  .tiptap hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    cursor: pointer;
    margin: 2rem 0;
  }

  .tiptap hr.ProseMirror-selectednode {
    border-top: 1px solid var(--purple);
  }
    `,
});
