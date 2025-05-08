"use client"

import "@blocknote/core/fonts/inter.css";
import { AddBlockButton, DragHandleButton, SideMenu, SideMenuController, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useState, useEffect } from "react";
import { RemoveBlockButton } from "./custom/menu-item/remove-block-button";
import { editorSchema } from "./custom/blocks/block-insertion";

const isWindow = typeof window !== "undefined";


const Editor = ({ contents, handleOnChange }: { contents: string, handleOnChange: (value: string) => void }) => {
  const editor = useCreateBlockNote({
    schema: editorSchema
  });

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    handleOnChange(markdown);
  };

  const setInitialContent = async () => {
    const initialDocument = await editor.tryParseMarkdownToBlocks(contents);
    editor.replaceBlocks(editor.document, initialDocument)
  }

  useEffect(() => {
    setInitialContent()
  }, [])

  return (
    <BlockNoteView
      editor={editor}
      shadCNComponents={{}}
      onChange={onChange}
      sideMenu={false}
      formattingToolbar={false}
    >
      <SideMenuController
        sideMenu={(props) => (
          <SideMenu {...props}>
            <RemoveBlockButton {...props} />
            <AddBlockButton {...props}/>
            <DragHandleButton {...props} />
          </SideMenu>
        )}
      />

    </BlockNoteView>
  );
}

export const BlockNoteEditor = ({ contents, handleOnChange }: { contents: string, handleOnChange: (value: string) => void }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (isWindow) {
      setIsClient(true);
    }
  }, [])

  return isClient ? <Editor contents={contents} handleOnChange={handleOnChange} /> : null
}

