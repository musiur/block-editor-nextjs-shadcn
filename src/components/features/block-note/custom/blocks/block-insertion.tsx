import {
  BlockNoteSchema,
  defaultBlockSpecs,
  insertOrUpdateBlock,
} from "@blocknote/core";
import { Alert } from "./alert";
import { AlertCircle, Bot } from "lucide-react";
import { Agent } from "./agent";
import { ActionList } from "./action-list";

export const editorSchema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
    agent: Agent,
    // actionItem: ActionItem,
    actionList: ActionList,
  },
});

export const insertAlert = (editor: typeof editorSchema.BlockNoteEditor) => ({
  title: "Alert",
  subtext: "Alert for emphasizing text",
  onItemClick: () =>
    insertOrUpdateBlock(editor, {
      type: "alert",
    }),
  aliases: [
    "alert",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Basic blocks",
  icon: <AlertCircle />,
});

export const insertAgent = (editor: typeof editorSchema.BlockNoteEditor) => ({
  title: "Agent",
  subtext: "Insert an agent block",
  onItemClick: () => {
    const agentBlock = insertOrUpdateBlock(editor, {
      type: "agent",
      props: {
        agentType: "chatgpt",
      },
    });

    editor.insertBlocks([{ type: "paragraph" }], agentBlock.id, "after");
  },
  aliases: ["agent", "assistant", "ai"],
  group: "AI Assistants",
  icon: <Bot />,
});
