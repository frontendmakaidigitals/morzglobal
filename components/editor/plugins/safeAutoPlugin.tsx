"use client";

import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoLinkNode } from "@lexical/link";
import { $getSelection, $isRangeSelection, $isTextNode, $createTextNode, LexicalEditor } from "lexical";
import type { LinkMatcher } from "@lexical/react/LexicalAutoLinkPlugin";

interface SafeAutoLinkPluginProps {
  matchers: LinkMatcher[];
}

export function SafeAutoLinkPlugin({ matchers }: SafeAutoLinkPluginProps) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor) return;

    const unregister = editor.registerUpdateListener(({ editorState }) => {
      // Only run auto-link logic if editor is focused
      const activeElement = document.activeElement;
      const root = editor.getRootElement();
      if (!root?.contains(activeElement)) {
        return; // skip if editor is not focused
      }

      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const nodes = selection.getNodes();
        nodes.forEach((node) => {
          if (!$isTextNode(node)) return;
          const text = node.getTextContent();

          matchers.forEach((matcher) => {
            const match = matcher(text);
            if (match) {
              // Replace matched text with a link node
              const start = match.index;
              const end = start + match.length;

              const beforeText = text.slice(0, start);
              const linkText = text.slice(start, end);
              const afterText = text.slice(end);

              const parent = node.getParent();
              if (!parent) return;

              editor.update(() => {
                // Replace current text node
                node.replace($createTextNode(beforeText));

                const linkNode = new AutoLinkNode(match.url);
                linkNode.append($createTextNode(linkText));
                parent.append(linkNode);

                parent.append($createTextNode(afterText));
              });
            }
          });
        });
      });
    });

    return () => {
      unregister();
    };
  }, [editor, matchers]);

  return null;
}
