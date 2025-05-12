"use client";

import "@blocknote/core/fonts/inter.css";
import {
  AddBlockButton,
  BlockTypeSelectItem,
  blockTypeSelectItems,
  DragHandleButton,
  FormattingToolbar,
  FormattingToolbarController,
  getDefaultReactSlashMenuItems,
  SideMenu,
  SideMenuController,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useState, useEffect } from "react";
import { RemoveBlockButton } from "./custom/menu-item/remove-block-button";
import {
  editorSchema,
  insertAgent,
  insertAlert,
} from "./custom/blocks/block-insertion";
import { useTheme } from "next-themes";
import { AlertCircle } from "lucide-react";
import { BlockNoteSchema, filterSuggestionItems } from "@blocknote/core";
import { insertActionList } from "./custom/blocks/action-list";
import { codeBlock } from "@blocknote/code-block";
import { insertActionItem } from "./custom/blocks/action-item";

const isWindow = typeof window !== "undefined";

const Editor = ({
  contents,
  handleOnChange,
}: {
  contents: string;
  handleOnChange: (value: string) => void;
}) => {
  const { theme, systemTheme } = useTheme();

  const editor = useCreateBlockNote({
    schema: editorSchema,
    codeBlock,
  });

  const onChange = async () => {
    console.log("onChange", editor.document);

    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    handleOnChange(markdown);
  };

  const setInitialContent = async () => {
    // const initialDocument = await editor.tryParseMarkdownToBlocks(contents);
    // console.log("initialDocument", initialDocument);
    const initialDocument: any = [
      {
        id: "b62da582-6ca9-4690-8947-162e77f0e2f3",
        type: "actionList",
        props: {
          id: "b62da582-6ca9-4690-8947-162e77f0e2f3",
          textColor: "default",
          textAlignment: "left",
          title: "New Action List",
          createdAt: "5/12/2025, 12:30:36 AM",
          createdBy: "@User",
          parent: true,
        },
        content: [
          {
            type: "text",
            text: "Learning graph database query patterns for the ML team, focusing on Apache Graph database.",
            styles: {},
          },
        ],
        children: [
          {
            id: "fa034ece-4e05-46e6-ad24-4da7944cb862",
            type: "actionItem",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              parent: false,
            },
            content: [
              {
                type: "text",
                text: "Action Item 1",
                styles: {},
              },
            ],
            children: [],
          },
          {
            id: "79552e8c-7dae-44e4-af03-7ed97809f7a4",
            type: "actionItem",
            props: {
              textColor: "default",
              backgroundColor: "default",
              textAlignment: "left",
              parent: false,
            },
            content: [
              {
                type: "text",
                text: "Action Item 2",
                styles: {},
              },
            ],
            children: [],
          },
        ],
      },
    ];

    editor.replaceBlocks(editor.document, initialDocument);
  };

  useEffect(() => {
    setInitialContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlockNoteView
      editor={editor}
      shadCNComponents={{}}
      onChange={onChange}
      sideMenu={false}
      formattingToolbar={false}
      theme={
        theme === "system" ? systemTheme : theme === "dark" ? "dark" : "light"
      }
    >
      <SideMenuController
        sideMenu={(props) => (
          <SideMenu {...props}>
            <RemoveBlockButton {...props} />
            <AddBlockButton {...props} />
            <DragHandleButton {...props} />
          </SideMenu>
        )}
      />
      <FormattingToolbarController
        formattingToolbar={() => (
          <FormattingToolbar
            blockTypeSelectItems={[
              ...blockTypeSelectItems(editor.dictionary),
              {
                name: "Alert",
                type: "alert",
                icon: AlertCircle,
                isSelected: (block) => block.type === "alert",
              } satisfies BlockTypeSelectItem,
            ]}
          />
        )}
      />

      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) => {
          const defaultItems = getDefaultReactSlashMenuItems(editor);

          const lastBasicBlockIndex = defaultItems.findLastIndex(
            (item) => item.group === "Basic blocks"
          );

          defaultItems.splice(
            lastBasicBlockIndex + 1,
            0,
            insertAlert(editor),
            insertActionList(editor),
            insertActionItem(editor)
          );

          return filterSuggestionItems(defaultItems, query);
        }}
      />

      <SuggestionMenuController
        triggerCharacter={"@"}
        getItems={async (query) => {
          const items = [insertAgent(editor)];
          return filterSuggestionItems(items, query);
        }}
      />
    </BlockNoteView>
  );
};

export const BlockNoteEditor = ({
  contents,
  handleOnChange,
}: {
  contents: string;
  handleOnChange: (value: string) => void;
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (isWindow) {
      setIsClient(true);
    }
  }, []);

  return isClient ? (
    <Editor contents={contents} handleOnChange={handleOnChange} />
  ) : null;
};
