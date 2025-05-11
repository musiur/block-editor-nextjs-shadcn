import { DynamicCollapsible } from "@/components/dynamics/collapsible";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

export const ActionList = () => {
  const actionsList = [
    {
      id: 1,
      title:
        "Learning graph database query patterns for the ML team, focusing on Apache Graph database.",
      createdAt: "34 keplar, 4332",
      createdBy: "@Rayquaza",
      actionItems: [
        {
          id: 1,
          title:
            "Learning graph database query patterns for the ML team, focusing on Apache Graph database.",
          createdAt: "34 keplar, 4332",
          createdBy: "@Rayquaza",
          files: [
            { id: 1, name: "Fast Refresh had" },
            { id: 2, name: "Fast Refresh had" },
            { id: 3, name: "Fast Refresh had" },
          ],
          notes: [
            { id: 1, name: "Fast Refresh had" },
            { id: 2, name: "Fast Refresh had" },
            { id: 3, name: "Fast Refresh had" },
          ],
        },
      ],
    },
  ];
  return (
    <Card className="action-list-container border border-border border-dashed rounded-xl p-4">
      <CardHeader className="flex items-center gap-2">
        <FlameKindling className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        <h3 className="text-lg md:text-xl font-semibold">Action List</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        {actionsList.map((action) => {
          return (
            <Card key={action.id} className="!p-0 !border-0 !shadow-none">
              <DynamicCollapsible
                className="py-4 hover:border-slate-300 dark:hover:border-slate-600 border border-border rounded-xl"
                trigger={
                  <CardHeader className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-700 dark:text-slate-300">
                        Generated at {action.createdAt} by {action.createdBy}
                      </p>
                      <p className="font-semibold">{action.title}</p>
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
                <ul className="space-y-4 p-4">
                  <h4 className="font-semibold">
                    Complete these 5 actions to achieve your goal:
                  </h4>
                  {action.actionItems?.map((actionItem) => {
                    return (
                      <li key={actionItem.id}>
                        <ActionItem data={actionItem} />
                      </li>
                    );
                  })}
                </ul>
              </DynamicCollapsible>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
};

export const ActionItem = ({ data }: { data: any }) => {
  return (
    <Card className="!p-0 !border-0 !shadow-none">
      <DynamicCollapsible
        className="py-4 hover:border-slate-300 dark:hover:border-slate-600 border border-border rounded-xl"
        trigger={
          <CardHeader className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                Generated at {data.createdAt} by @{data.createdBy}
                <Badge variant="destructive" className="ml-2">
                  Urgent
                </Badge>
              </p>
              <p className="font-semibold">
                Learning graph database query patterns for the ML team, focusing
                on Apache Graph database.
              </p>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <FilePlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <UserPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <Share2 className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <FileSearch className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <HeartPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <Calendar className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <FolderPlus className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
              <Info className="min-w-8 min-h-8 border rounded-lg p-2 border-border stroke-slate-500 dark:stroke-slate-300" />
            </div>
          </CardHeader>
        }
      >
        <div className="px-6 py-4 border-t flex flex-wrap gap-2 mt-4">
          <div className="space-y-2">
            <h4 className="text-slate-400 dark:text-slate-400">Files</h4>
            <ul className="flex flex-wrap gap-2 items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                return (
                  <li key={num}>
                    <div className="flex items-center gap-2 p-2 min-h-8 rounded-lg border stroke-slate-500 dark:stroke-slate-300 group hover:cursor-pointer">
                      <File className="w-4 h-4 text-primary/50 group-hover:text-primary" />
                      <p className="text-xs">Fast Refresh had</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-slate-400 dark:text-slate-400">Notes</h4>
            <ul className="flex flex-wrap gap-2 items-center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                return (
                  <li key={num}>
                    <div className="flex items-center gap-2 p-2 min-h-8 rounded-lg border stroke-slate-500 dark:stroke-slate-300 group hover:cursor-pointer">
                      <File className="w-4 h-4 text-primary/50 group-hover:text-primary" />
                      <p className="text-xs">Fast Refresh had</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </DynamicCollapsible>
    </Card>
  );
};
