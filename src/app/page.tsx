"use client";

import { Layouts } from "@/components/layouts";
import dynamic from "next/dynamic";

const BlockNoteEditor = dynamic(
  () =>
    import("@/components/features/block-note/block-note-editor").then(
      (mod) => mod.BlockNoteEditor
    ),
  { ssr: false }
);

const Home = () => {
  return (
    <Layouts.Section>
      <div className="max-w-4xl mx-auto p-10 border border-border rounded-xl bg-slate-50 dark:bg-slate-900">
        <BlockNoteEditor
          contents={InitialMarkdown}
          handleOnChange={(value: string) => console.log(value)}
        />
      </div>
    </Layouts.Section>
  );
};

export default Home;

const InitialMarkdown = ``;
