"use client";
import React, { useEffect } from "react";
import { ListItemNode, ListNode } from "@lexical/list";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { HistoryToolbarPlugin } from "@/components/editor/plugins/toolbar/history-toolbar-plugin";
import { EditorState, SerializedEditorState } from "lexical";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ParagraphNode, TextNode } from "lexical";
import { ElementFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/element-format-toolbar-plugin";
import { ContentEditable } from "@/components/editor/editor-ui/content-editable";
import { BlockFormatDropDown } from "@/components/editor/plugins/toolbar/block-format-toolbar-plugin";
import { FormatBulletedList } from "@/components/editor/plugins/toolbar/block-format/format-bulleted-list";
import { FormatCheckList } from "@/components/editor/plugins/toolbar/block-format/format-check-list";
import { FormatHeading } from "@/components/editor/plugins/toolbar/block-format/format-heading";
import { FormatNumberedList } from "@/components/editor/plugins/toolbar/block-format/format-numbered-list";
import { FormatParagraph } from "@/components/editor/plugins/toolbar/block-format/format-paragraph";
import { FormatQuote } from "@/components/editor/plugins/toolbar/block-format/format-quote";
import { ToolbarPlugin } from "@/components/editor/plugins/toolbar/toolbar-plugin";
import { editorTheme } from "@/components/editor/themes/editor-theme";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FontColorToolbarPlugin } from "@/components/editor/plugins/toolbar/font-color-toolbar-plugin";
import { FontBackgroundToolbarPlugin } from "@/components/editor/plugins/toolbar/font-background-toolbar-plugin";
import { FontFamilyToolbarPlugin } from "@/components/editor/plugins/toolbar/font-family-toolbar-plugin";
import { FontFormatToolbarPlugin } from "@/components/editor/plugins/toolbar/font-format-toolbar-plugin";
import { FontSizeToolbarPlugin } from "@/components/editor/plugins/toolbar/font-size-toolbar-plugin";
import { LinkToolbarPlugin } from "@/components/editor/plugins/toolbar/link-toolbar-plugin";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import type { LinkMatcher } from "@lexical/react/LexicalAutoLinkPlugin";
import { ActionsPlugin } from "@/components/editor/plugins/actions/actions-plugin";
import { ClearEditorActionPlugin } from "@/components/editor/plugins/actions/clear-editor-plugin";
import { CounterCharacterPlugin } from "@/components/editor/plugins/actions/counter-character-plugin";
import { useState } from "react";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { FloatingLinkEditorPlugin } from "@/components/editor/plugins/toolbar/floatingLinkToolbar";
import { TableNode, TableRowNode, TableCellNode } from "@lexical/table";
import { InsertTable } from "@/components/editor/plugins/toolbar/block-insert/insert-table";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { BlockInsertPlugin } from "@/components/editor/plugins/toolbar/block-insert-plugin";
import { LexicalEditor } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { SafeAutoLinkPlugin } from "@/components/editor/plugins/safeAutoPlugin";
const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes: [
    HeadingNode,
    ParagraphNode,
    TextNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    AutoLinkNode,
    LinkNode,
    TableNode,
    TableRowNode,
    TableCellNode,
  ] as any,
  onError: (error: Error, editor: LexicalEditor) => {
    console.error(error);
  },
};

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  readOnly = false,
  clampLines = 2,
  blogPage = false,
  text = "text-slate-900",
}: {
  editorState?: EditorState;
  editorSerializedState?: SerializedEditorState;
  onChange?: (editorState: EditorState) => void;
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void;
  readOnly?: boolean;
  clampLines?: number;
  blogPage?: boolean;
  text?: string;
}) {
  return (
    <div
      className={`${readOnly ? "bg-transparent" : "bg-background"}  overflow-hidden ${readOnly ? "" : "rounded-lg border shadow"} `}
    >
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          editable: !readOnly,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins
            readOnly={readOnly}
            serialized={editorSerializedState}
            clampLines={clampLines}
            blogPage={blogPage}
            text={text}
          />
          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState, editor, tags) => {
              const shouldUpdate = !tags.has("history-merge") && tags.size > 0;

              if (shouldUpdate || tags.size === 0) {
                onChange?.(editorState);
                onSerializedChange?.(editorState.toJSON());
              }
            }}
          />
        </TooltipProvider>
      </LexicalComposer>
    </div>
  );
}

const placeholder = "Start typing...";

export function Plugins({
  readOnly,
  serialized,
  clampLines = 2,
  blogPage = false,
  text = "text-slate-900",
}: {
  readOnly?: boolean;
  serialized?: SerializedEditorState;
  clampLines?: number;
  blogPage?: boolean;
  text?: string;
}) {
  const URL_REGEX =
    /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

  const urlMatcher: LinkMatcher = (text: string) => {
    const match = URL_REGEX.exec(text);
    if (!match) return null;

    const fullMatch = match[0];

    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith("http") ? fullMatch : `https://${fullMatch}`,
      // optional attributes:
      // attributes: { rel: "noreferrer", target: "_blank" },
    };
  };
  const MATCHERS: LinkMatcher[] = [urlMatcher];
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };
  return (
    <div className="relative">
      {/* Toolbar only visible in editing mode */}
      {!readOnly && (
        <ToolbarPlugin>
          {({ blockType }) => (
            <div className="sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1 items-center">
              <HistoryToolbarPlugin />
              <BlockFormatDropDown>
                <FormatParagraph />
                <FormatHeading levels={["h1", "h2", "h3"]} />
                <FormatNumberedList />
                <FormatBulletedList />
                <FormatCheckList />
                <FormatQuote />
              </BlockFormatDropDown>
              <FontFamilyToolbarPlugin />
              <ElementFormatToolbarPlugin />
              <FontColorToolbarPlugin />
              <FontBackgroundToolbarPlugin />
              <FontSizeToolbarPlugin />
              {["bold", "italic", "underline", "strikethrough"].map(
                (format) => (
                  <FontFormatToolbarPlugin key={format} format={format} />
                )
              )}
              <LinkToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
              <BlockInsertPlugin>
                <InsertTable />
              </BlockInsertPlugin>
            </div>
          )}
        </ToolbarPlugin>
      )}

      <div className="relative">
        {readOnly && blogPage === false ? (
          // Plain text preview with clamp
          <div className={`relative line-clamp-${clampLines} text-sm ${text}`}>
            {renderPlainTextFromEditorState(serialized)}
          </div>
        ) : (
          <RichTextPlugin
            contentEditable={
              <div ref={onRef}>
                <ContentEditable
                  placeholder={placeholder}
                  className={`ContentEditable__root relative block ${
                    readOnly ? "" : "h-72 min-h-96 overflow-auto px-8 py-4"
                  } focus:outline-none`}
                />
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        )}
        <ClickableLinkPlugin />
        <SafeAutoLinkPlugin matchers={MATCHERS} />
        <LinkPlugin />
        <FloatingLinkEditorPlugin
          anchorElem={floatingAnchorElem}
          isLinkEditMode={isLinkEditMode}
          setIsLinkEditMode={setIsLinkEditMode}
        />
        <HistoryPlugin />
        {!readOnly && <TablePlugin />}
        <ListPlugin />
        <CheckListPlugin />
      </div>

      {/* Bottom actions only in editing mode */}
      {!readOnly && (
        <ActionsPlugin>
          <div className="clear-both flex items-center justify-between gap-2 overflow-auto border-t p-1">
            <div className="flex flex-1 justify-start">
              {/* left actions */}
            </div>
            <CounterCharacterPlugin charset="UTF-16" />
            <div className="flex flex-1 justify-end">
              <ClearEditorActionPlugin />
              <ClearEditorPlugin />
            </div>
          </div>
        </ActionsPlugin>
      )}
    </div>
  );
}
// Render plain text for preview
function renderPlainTextFromEditorState(
  serialized: SerializedEditorState | undefined
) {
  if (!serialized) return "";
  try {
    const root = serialized.root;
    if (!root || !root.children) return "";
    return root.children
      .map(
        (node: any) =>
          node.children?.map((child: any) => child.text).join(" ") ?? ""
      )
      .join(" ");
  } catch (e) {
    return "";
  }
}
