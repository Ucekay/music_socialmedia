import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

import type { Transaction } from '@tiptap/pm/state';

export interface NodeHighlightOptions {
  /**
   * The class name that should be added to the highlighted node.
   * @default 'is-highlighted'
   * @example 'is-active'
   */
  className: string;

  /**
   * The types where the highlight attribute can be applied.
   * @default []
   * @example ['paragraph', 'heading']
   */
  types: string[];
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    nodeHighlight: {
      /**
       * Set the highlight attribute on the deepest node
       * @example editor.commands.setNodeHighlight()
       */
      setNodeHighlight: () => ReturnType;
      /**
       * Unset the highlight attribute
       * @example editor.commands.unsetNodeHighlight()
       */
      unsetNodeHighlight: () => ReturnType;
      /**
       * Toggle the highlight attribute on the deepest node
       * @example editor.commands.toggleNodeHighlight()
       */
      toggleNodeHighlight: () => ReturnType;
    };
  }
}

export const NodeHighlight: Extension<NodeHighlightOptions> =
  Extension.create<NodeHighlightOptions>({
    name: 'nodeHighlight',

    addOptions() {
      return {
        className: 'is-highlighted',
        types: [],
      };
    },

    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            highlight: {
              default: null,
              parseHTML: (element) => element.hasAttribute('data-highlight'),
              renderHTML: (attributes) => {
                if (!attributes.highlight) {
                  return {};
                }
                return { 'data-highlight': '' };
              },
            },
          },
        },
      ];
    },

    addCommands() {
      const addMetadata = (tr: Transaction) => {
        return tr.setMeta('addToHistory', false);
      };

      return {
        setNodeHighlight:
          () =>
          ({ state, dispatch }) => {
            const { selection } = state;
            const { $from } = selection;
            let targetNode = $from.node();
            let targetPos = $from.pos;

            // Find the deepest node within the selection
            for (let i = $from.depth; i > 0; i--) {
              const node = $from.node(i);
              if (this.options.types.includes(node.type.name)) {
                targetNode = node;
                targetPos = $from.before(i);
                break;
              }
            }

            if (!this.options.types.includes(targetNode.type.name)) {
              return false;
            }

            if (dispatch) {
              const tr = addMetadata(
                state.tr.setNodeAttribute(targetPos, 'highlight', true),
              );
              dispatch(tr);
            }
            return true;
          },
        unsetNodeHighlight:
          () =>
          ({ state, dispatch }) => {
            const { doc, tr } = state;
            let changed = false;

            doc.descendants((node, pos) => {
              if (
                node.attrs.highlight &&
                this.options.types.includes(node.type.name)
              ) {
                tr.setNodeAttribute(pos, 'highlight', null);
                changed = true;
              }
            });

            if (changed && dispatch) {
              dispatch(addMetadata(tr));
            }
            return changed;
          },
        toggleNodeHighlight:
          () =>
          ({ state, dispatch }) => {
            const { selection } = state;
            const { $from } = selection;
            let targetNode = $from.node();
            let targetPos = $from.pos;

            // Find the deepest node within the selection
            for (let i = $from.depth; i > 0; i--) {
              const node = $from.node(i);
              if (this.options.types.includes(node.type.name)) {
                targetNode = node;
                targetPos = $from.before(i);
                break;
              }
            }

            if (!this.options.types.includes(targetNode.type.name)) {
              return false;
            }

            if (dispatch) {
              const newValue = !targetNode.attrs.highlight;
              const tr = addMetadata(
                state.tr.setNodeAttribute(targetPos, 'highlight', newValue),
              );
              dispatch(tr);
            }
            return true;
          },
      };
    },

    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('nodeHighlight'),
          props: {
            decorations: ({ doc }) => {
              const decorations: Decoration[] = [];

              doc.descendants((node, pos) => {
                if (
                  node.attrs.highlight &&
                  this.options.types.includes(node.type.name)
                ) {
                  decorations.push(
                    Decoration.node(pos, pos + node.nodeSize, {
                      class: this.options.className,
                    }),
                  );
                }
              });

              return DecorationSet.create(doc, decorations);
            },
          },
        }),
      ];
    },
  });
