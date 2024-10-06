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
  return <EditorContent editor={editor} />;
};
