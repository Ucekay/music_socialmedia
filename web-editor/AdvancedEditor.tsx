import { useEffect } from 'react';

import { TenTapStartKit, useTenTap } from '@10play/tentap-editor';
import { EditorContent } from '@tiptap/react';

import {
  CodeBlockBridge,
  HorizontalRuleBridge,
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
      HorizontalRuleBridge,
      SubscriptBridge,
      SuperscriptBridge,
      YouTubeBridge,
      ...TenTapStartKit,
    ],
  });
  const isFocused = editor?.isFocused;
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    editor?.commands.scrollIntoView();
  }, [editor, isFocused]);
  return <EditorContent editor={editor} />;
};
