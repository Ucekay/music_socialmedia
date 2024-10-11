import { BridgeExtension } from '@10play/tentap-editor';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { all, createLowlight } from 'lowlight';

const lowlight = createLowlight(all);

type CodeBlockLowlightEditorState = {
  isCodeBlockLowlightActive: boolean;
  canToggleCodeBlockLowlight: boolean;
};

type CodeBlockLowlightEditorInstance = {
  toggleCodeBlockLowlight: () => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends CodeBlockLowlightEditorState {}
  interface EditorBridge extends CodeBlockLowlightEditorInstance {}
}

export enum CodeBlockLowlightEditorActionType {
  ToggleCodeBlockLowlight = 'toggle-code-block-lowlight',
}

type CodeBlockLowlightMessage = {
  type: CodeBlockLowlightEditorActionType.ToggleCodeBlockLowlight;
  payload?: undefined;
};

export const CodeBlockLowlightBridge = new BridgeExtension<
  CodeBlockLowlightEditorState,
  CodeBlockLowlightEditorInstance,
  CodeBlockLowlightMessage
>({
  tiptapExtension: CodeBlockLowlight.configure({
    lowlight,
  }),
  onBridgeMessage: (editor, message) => {
    if (
      message.type === CodeBlockLowlightEditorActionType.ToggleCodeBlockLowlight
    ) {
      editor.chain().focus().toggleCodeBlock().run();
    }

    return false;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      toggleCodeBlockLowlight: () =>
        sendBridgeMessage({
          type: CodeBlockLowlightEditorActionType.ToggleCodeBlockLowlight,
        }),
    };
  },
  extendEditorState: (editor) => {
    return {
      canToggleCodeBlockLowlight: editor.can().toggleCodeBlock(),
      isCodeBlockLowlightActive: editor.isActive('codeBlockLowlight'),
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
  }
  .tiptap pre .hljs-comment,
  .tiptap pre .hljs-quote {
    color: #616161;
  }

  .tiptap pre .hljs-variable,
  .tiptap pre .hljs-template-variable,
  .tiptap pre .hljs-attribute,
  .tiptap pre .hljs-tag,
  .tiptap pre .hljs-name,
  .tiptap pre .hljs-regexp,
  .tiptap pre .hljs-link,
  .tiptap pre .hljs-selector-id,
  .tiptap pre .hljs-selector-class {
    color: #f98181;
  }

  .tiptap pre .hljs-number,
  .tiptap pre .hljs-meta,
  .tiptap pre .hljs-built_in,
  .tiptap pre .hljs-builtin-name,
  .tiptap pre .hljs-literal,
  .tiptap pre .hljs-type,
  .tiptap pre .hljs-params {
    color: #fbbc88;
  }

  .tiptap pre .hljs-string,
  .tiptap pre .hljs-symbol,
  .tiptap pre .hljs-bullet {
    color: #b9f18d;
  }

  .tiptap pre .hljs-title,
  .tiptap pre .hljs-section {
    color: #faf594;
  }

  .tiptap pre .hljs-keyword,
  .tiptap pre .hljs-selector-tag {
    color: #70cff8;
  }

  .tiptap pre .hljs-emphasis {
    font-style: italic;
  }

  .tiptap pre .hljs-strong {
    font-weight: 700;
  }

  `,
});
