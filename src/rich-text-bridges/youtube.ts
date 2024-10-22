import { BridgeExtension } from '@10play/tentap-editor';
import Youtube from '@tiptap/extension-youtube';

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type YoutubeLinkEditorState = {};

type YoutubeLinkEditorInstance = {
  setYoutubeVideo: (src: string | null) => void;
};

declare module '@10play/tentap-editor' {
  interface BridgeState extends YoutubeLinkEditorState {}
  interface EditorBridge extends YoutubeLinkEditorInstance {}
}

export enum YoutubeLinkEditorActionType {
  setYoutubeVideo = 'set-youtube-link',
}

type YoutubeLinkMessage = {
  type: YoutubeLinkEditorActionType.setYoutubeVideo;
  payload: null | string;
};

export const YouTubeBridge = new BridgeExtension<
  YoutubeLinkEditorState,
  YoutubeLinkEditorInstance,
  YoutubeLinkMessage
>({
  tiptapExtension: Youtube.configure({
    width: 640,
    height: 360,
    nocookie: true,
  }),
  onBridgeMessage: (editor, { type, payload }) => {
    if (type === YoutubeLinkEditorActionType.setYoutubeVideo) {
      // cancelled
      if (payload === null) {
        return false;
      }

      // empty
      if (payload === '') {
        return false;
      }

      // update link
      editor
        .chain()
        .focus()
        .setYoutubeVideo({ src: payload })
        .createParagraphNear()
        .run();

      return true;
    }

    return false;
  },
  extendEditorInstance: (sendBridgeMessage) => {
    return {
      setYoutubeVideo: (src) => {
        sendBridgeMessage({
          type: YoutubeLinkEditorActionType.setYoutubeVideo,
          payload: src,
        });
      },
    };
  },
  extendEditorState: () => {
    return {};
  },
  extendCSS: `
  .tiptap div[data-youtube-video] {
  cursor: move;
  padding: 0.5rem 0;
  width: 100%;
  aspect-ratio: 16 / 9;
}

.tiptap div[data-youtube-video] iframe {
  border: 0.5rem solid var(--black-contrast);
  height: 100%;
  width: 100%;
  outline: 0px solid transparent;
  border-radius: 0.5rem;
}

.tiptap div[data-youtube-video].ProseMirror-selectednode iframe {
  outline: 3px solid var(--purple);
  transition: outline 0.15s;
}`,
});
