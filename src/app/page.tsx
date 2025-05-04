"use client"

import dynamic from "next/dynamic";

const BlockNoteEditor = dynamic(() =>
  import("@/components/block-note-editor").then(mod => mod.BlockNoteEditor),
  { ssr: false }
);


const Home = () => {
  return (
    <BlockNoteEditor />
  )
}

export default Home;
