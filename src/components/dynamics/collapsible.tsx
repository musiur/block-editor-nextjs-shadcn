"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import clsx from "clsx";
import { cn } from "@/lib/utils";

interface CollapsibleProps
  extends React.ComponentPropsWithoutRef<typeof Collapsible> {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function DynamicCollapsible({
  trigger,
  children,
  ...props
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      {...props}
      className={cn(props.className, "w-full border")}
    >
      <div className="flex items-start justify-between space-x-4">
        <div className="flex-1">{trigger}</div>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="mr-2">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}
