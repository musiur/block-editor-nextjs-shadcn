import { Block, defaultProps, insertOrUpdateBlock } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { editorSchema } from "./block-insertion";
import { FlameKindling, SquarePlus, Trash } from "lucide-react";
import { insertActionItem } from "./action-item";

export const ActionList = createReactBlockSpec(
  {
    type: "actionList",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      id: { default: "" },
      title: { default: "" },
      createdAt: { default: "" },
      createdBy: { default: "" },
      parentId: { default: "" },
      parent: { default: true },
    },
    content: "inline",
  },
  {
    render: ({ block, editor, contentRef }) => {
      const props = block.props;
      const { createdAt, createdBy } = props;

      const handleTrash = () => {
        console.log("handleTrash", block.id);
        editor.removeBlocks([block.id]);
      };

      const handleAddActionItem = () => {
        insertOrUpdateBlock(editor, {
          type: "actionList",
          props: {
            id: crypto.randomUUID(),
            createdAt: new Date().toLocaleString(),
            createdBy: "@User",
            title: "New Action List",
          },
        });
      };

      return (
        <Card className="w-full !p-0 border border-red-600 !shadow-none">
          <CardHeader className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Generated at {createdAt} by {createdBy}
              </p>
              <p className="font-semibold" ref={contentRef}></p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center flex-wrap gap-2">
              <SquarePlus
                role="button"
                onClick={handleAddActionItem}
                className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300"
              />
              {/* <UserPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <Share2 className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <Mail className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <HeartPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" /> */}
              <Trash
                role="button"
                onClick={handleTrash}
                className="hover:cursor-pointer min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300"
              />
            </div>
          </CardContent>
        </Card>
      );
    },
  }
);

export const insertActionList = (
  editor: typeof editorSchema.BlockNoteEditor
) => ({
  title: "Action List",
  subtext: "Create a new action list with tasks",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "actionList",
      props: {
        id: crypto.randomUUID(),
        createdAt: new Date().toLocaleString(),
        createdBy: "@User",
        title: "New Action List",
      },
    });
  },
  aliases: ["action", "task", "todo", "list"],
  group: "Actions",
  icon: <FlameKindling />,
});
