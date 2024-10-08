import { useEffect } from 'react';

import { TenTapStartKit, useTenTap } from '@10play/tentap-editor';
import { EditorContent } from '@tiptap/react';

import { YouTubeBridge } from '../src/rich-text-bridges/youtube';

/**
 * Here we control the web side of our custom editor
 */
export const AdvancedEditor = () => {
  const editor = useTenTap({
    bridges: [YouTubeBridge, ...TenTapStartKit],
  });
  const isFocused = editor?.isFocused;
  useEffect(() => {
    if (isFocused) editor?.commands.scrollIntoView();
  }, [isFocused, editor]);
  return <EditorContent editor={editor} />;
};
