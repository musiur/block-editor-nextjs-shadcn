"use client"

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useState, useEffect } from "react";

const isWindow = typeof window !== "undefined";

const Editor = () => {
  const editor = useCreateBlockNote();

  const onChange = async () => {
    // Converts the editor's contents from Block objects to Markdown and store to state.
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    console.log(markdown);
  };

  return (
    <BlockNoteView
      editor={editor}
      className="w-full h-screen"
      shadCNComponents={{}}
      onChange={onChange}
    />
  );
}

export const BlockNoteEditor = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (isWindow) {
      setIsClient(true);
    }
  }, [])

  return isClient ? <Editor /> : null
}

