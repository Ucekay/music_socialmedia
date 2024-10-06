import { TenTapStartKit, useTenTap } from '@10play/tentap-editor';
import { EditorContent } from '@tiptap/react';

/**
 * Here we control the web side of our custom editor
 */
export const AdvancedEditor = () => {
  const editor = useTenTap({
    bridges: [...TenTapStartKit],
  });
  return <EditorContent editor={editor} />;
};
