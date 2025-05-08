import { BlockNoteSchema, defaultBlockSpecs, insertOrUpdateBlock } from "@blocknote/core";
import { Alert } from "./alert";
import { AlertCircle } from "lucide-react";

export const editorSchema = BlockNoteSchema.create({
    blockSpecs: {
        ...defaultBlockSpecs,
        alert: Alert,
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