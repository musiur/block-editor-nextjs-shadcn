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
import { filterSuggestionItems } from "@blocknote/core";
import { insertActionList } from "./custom/blocks/action-list";

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
  });

  const onChange = async () => {
    console.log("onChange", editor.document);

    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    handleOnChange(markdown);
  };

  const setInitialContent = async () => {
    const initialDocument = await editor.tryParseMarkdownToBlocks(contents);
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
            insertActionList(editor)
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
