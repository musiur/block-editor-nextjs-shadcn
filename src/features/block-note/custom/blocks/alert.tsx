"use client"

import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Alert as ShadcnAlert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import clsx from "clsx";
import { AlertCircleIcon } from "lucide-react";

export const alertTypes = [
  {
    title: "Default",
    value: "default",
    color: <div className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10" />,
    icon: AlertCircleIcon,
    variant: "default"
  },
  {
    title: "Destructive",
    value: "destructive",
    color: <div className="w-4 h-4 rounded-full bg-destructive border border-destructive" />,
    icon: AlertCircleIcon,
    variant: "destructive"
  },
] as const;

export const Alert = createReactBlockSpec(
  {
    type: "alert",
    propSchema: {
      textAlignment: defaultProps.textAlignment,
      textColor: defaultProps.textColor,
      type: {
        default: "default",
        values: ["default", "destructive"],
      },
    },
    content: "inline",
  },
  {
    render: (props) => {
      const alertType = alertTypes.find(
        (a) => a.value === props.block.props.type
      )!;
      const Icon = alertType.icon;

      return (
        <ShadcnAlert className={clsx("flex items-center gap-2 border my-2 font-medium", {
          "bg-red-600 text-white": alertType.variant === "destructive",
          "bg-black/10 dark:bg-white/10": alertType.variant === "default", 
        })}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AlertTitle className="cursor-pointer">
                <Icon className="w-4 h-4" />
              </AlertTitle>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Alert Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {alertTypes.map((type) => {
                return (
                  <DropdownMenuItem
                    key={type.value}
                    onClick={() => {
                      props.editor.updateBlock(props.block, {
                        type: "alert",
                        props: { type: type.value },
                      })
                    }}
                  >
                    {type.color}
                    <span>{type.title}</span>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDescription>
            <div ref={props.contentRef} />
          </AlertDescription>
        </ShadcnAlert>
      );
    },
  }
);