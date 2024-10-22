import { useEffect } from 'react';

import { TenTapStartKit, useTenTap } from '@10play/tentap-editor';
import { EditorContent } from '@tiptap/react';

import {
  CodeBlockBridge,
  HorizontalRuleBridge,
  NodeHighlightBridge,
  SubscriptBridge,
  SuperscriptBridge,
  YouTubeBridge,
} from '../src/rich-text-bridges';

/**
 * Here we control the web side of our custom editor
 */
export const AdvancedEditor = () => {
  const editor = useTenTap({
    bridges: [
      CodeBlockBridge,
      NodeHighlightBridge,
      HorizontalRuleBridge,
      SubscriptBridge,
      SuperscriptBridge,
      YouTubeBridge,
      ...TenTapStartKit,
    ],
  });
  const isFocused = editor?.isFocused;
  const state = editor?.state;

  useEffect(() => {
    editor?.commands.scrollIntoView();
    if (isFocused) {
      editor?.commands.unsetNodeHighlight();
    } else {
      editor?.commands.setNodeHighlight();
    }
  }, [editor, isFocused]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isFocused) editor?.commands.unsetNodeHighlight();
  }, [editor, isFocused, state]);

  return <EditorContent editor={editor} />;
};
