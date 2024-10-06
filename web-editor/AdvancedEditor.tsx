import { CoreBridge, TenTapStartKit, useTenTap } from '@10play/tentap-editor';
import { EditorContent } from '@tiptap/react';

/**
 * Here we control the web side of our custom editor
 */
export const AdvancedEditor = () => {
  const editor = useTenTap({
    bridges: [CoreBridge],
    tiptapOptions: {
      extensions: [...TenTapStartKit],
    },
  });
  return <EditorContent editor={editor} />;
};
