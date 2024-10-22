import { Extension } from '@tiptap/core';
import { history, redo, undo } from '@tiptap/pm/history';

import type { HistoryOptions as ProseMirrorHistoryOptions } from '@tiptap/extension-history';
import type { Transaction } from '@tiptap/pm/state';

interface CustomHistoryOptions extends ProseMirrorHistoryOptions {
  selectTransactions?: (tr: Transaction) => boolean;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    history: {
      undo: () => ReturnType;
      redo: () => ReturnType;
    };
  }
}

export const CustomHistory = Extension.create<CustomHistoryOptions>({
  name: 'history',

  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500,
    };
  },

  addCommands() {
    return {
      undo:
        () =>
        ({ state, dispatch }) => {
          return undo(state, dispatch);
        },
      redo:
        () =>
        ({ state, dispatch }) => {
          return redo(state, dispatch);
        },
    };
  },

  addProseMirrorPlugins() {
    const { depth, newGroupDelay } = this.options;

    return [
      history({
        depth,
        newGroupDelay,
        // @ts-ignore: Ignore the type error for selectTransactions
        selectTransactions: (tr: Transaction) => {
          // NodeHighlight関連の変更を除外
          if (tr.getMeta('nodeHighlight')) {
            return false;
          }
          // その他のhistoryに追加したくない変更があれば、ここで条件を追加

          // デフォルトの動作（addToHistoryメタデータをチェック）
          return tr.getMeta('addToHistory') !== false;
        },
      }),
    ];
  },

  addKeyboardShortcuts() {
    return {
      'Mod-z': () => this.editor.commands.undo(),
      'Shift-Mod-z': () => this.editor.commands.redo(),
      'Mod-y': () => this.editor.commands.redo(),
    };
  },
});
