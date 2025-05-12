import { defaultProps, insertOrUpdateBlock } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FlameKindling,
  HeartPlus,
  Mail,
  Share2,
  SquarePlus,
  Trash,
  UserPlus,
} from "lucide-react";
import { editorSchema } from "./block-insertion";

export const ActionItem = createReactBlockSpec(
  {
    type: "actionItem",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      id: { default: "" },
      title: { default: "" },
      createdAt: { default: "" },
      createdBy: { default: "" },
      parentId: { default: "" },
    },
    content: "inline",
  },
  {
    render: ({ block, editor, contentRef }) => {
      const props = block.props;
      const { title, createdAt, createdBy } = props;

      const handleTrash = () => {
        console.log("handleTrash", block.id);
        editor.removeBlocks([block.id]);
      };

      return (
        <Card className="!w-full action-list-container border border-border border-dashed rounded-xl p-4">
          <CardHeader className="space-y-2">
            <p>
              Created at {createdAt} by {createdBy}
            </p>
            <div ref={contentRef} className="font-semibold" />
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center flex-wrap gap-2">
              <SquarePlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <UserPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <Share2 className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <Mail className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <HeartPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <Trash
                role="button"
                onClick={handleTrash}
                className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300"
              />
            </div>
          </CardContent>
        </Card>
      );
    },
  }
);

export const insertActionItem = (
  editor: typeof editorSchema.BlockNoteEditor
) => ({
  title: "Action Item",
  subtext: "Create a new action Item with tasks",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "actionItem",
      props: {
        id: crypto.randomUUID(),
        createdAt: new Date().toLocaleString(),
        createdBy: "@User",
        title: "New Action Item",
        parentId: crypto.randomUUID(),
      },
    });
  },
  aliases: ["action", "task", "todo", "item"],
  group: "Actions",
  icon: <FlameKindling />,
});
