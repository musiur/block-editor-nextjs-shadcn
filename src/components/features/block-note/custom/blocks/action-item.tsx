import { defaultProps, insertOrUpdateBlock } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FlameKindling } from "lucide-react";
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

      return (
        <Card className="!w-full action-list-container border border-border border-dashed rounded-xl p-4">
          <CardHeader className="flex items-center gap-2">
            <FlameKindling className="w-6 h-6 text-slate-500 dark:text-slate-400" />
            <div
              ref={contentRef}
              className="text-lg md:text-xl font-semibold min-h-[32px]"
            >
              {title} - Created at {createdAt} by {createdBy}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>Description</div>
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
