import { BridgeExtension } from '@10play/tentap-editor';
import { CodeBlock } from '@tiptap/extension-code-block';

type CodeBlockEditorState = {
  isCodeBlockActive: boolean;
  canToggleCodeBlock: boolean;
};

type CodeBlockEditorInstance = {
  toggleCodeBlock: () => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends CodeBlockEditorState {}
  interface EditorBridge extends CodeBlockEditorInstance {}
}

export enum CodeBlockEditorActionType {
  ToggleCodeBlock = 'toggle-code-block',
}

type CodeBlockMessage = {
  type: CodeBlockEditorActionType.ToggleCodeBlock;
  payload?: undefined;
};

export const CodeBlockBridge = new BridgeExtension<
  CodeBlockEditorState,
  CodeBlockEditorInstance,
  CodeBlockMessage
>({
  tiptapExtension: CodeBlock,
  onBridgeMessage: (editor, message) => {
    if (message.type === CodeBlockEditorActionType.ToggleCodeBlock) {
      editor.chain().focus().toggleCodeBlock().run();
    }

    return false;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      toggleCodeBlock: () =>
        sendBridgeMessage({ type: CodeBlockEditorActionType.ToggleCodeBlock }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canToggleCodeBlock: editor.can().toggleCodeBlock(),
      isCodeBlockActive: editor.isActive('codeBlock'),
    };
  },
  extendCSS: `
  .tiptap pre {
    border-radius: 0.5rem;
    margin: 0.5rem 0;
    padding: 0.5rem;
  }
  .tiptap pre code {
    background: none;
    color: inherit;
    font-size: 0.8rem;
    padding: 0;
  }
  `,
});
