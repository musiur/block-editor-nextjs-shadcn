import { defaultProps, insertOrUpdateBlock } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { editorSchema } from "./block-insertion";
import { DynamicCollapsible } from "@/components/dynamics/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  File,
  FilePlus,
  FileSearch,
  FlameKindling,
  FolderPlus,
  HeartPlus,
  Info,
  Mail,
  Share2,
  SquarePlus,
  Trash,
  UserPlus,
} from "lucide-react";

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
    },
    content: "inline",
  },
  {
    render: ({ block, editor, contentRef }) => {
      const props = block.props;
      const { title, createdAt, createdBy } = props;

      const inEditor = editor.getBlock(block.id);

      console.log(inEditor, block);

      return (
        <Card className="w-full !p-0 !border-0 !shadow-none">
          <DynamicCollapsible
            className="py-4 hover:border-slate-300 dark:hover:border-slate-600 border border-border rounded-xl"
            trigger={
              <CardHeader className="space-y-4">
                <div className="space-y-1">
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    Generated at {createdAt} by {createdBy}
                  </p>
                  <p className="font-semibold" ref={contentRef}></p>
                </div>
                <div className="flex items-center flex-wrap gap-2">
                  <SquarePlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
                  <UserPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
                  <Share2 className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
                  <Mail className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
                  <HeartPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
                  <Trash className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
                </div>
              </CardHeader>
            }
          >
            Action items
          </DynamicCollapsible>
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
    const parentBlock = insertOrUpdateBlock(editor, {
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
