import { defaultProps } from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import { AlertCircle, Info } from "lucide-react";
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

export const alertTypes = [
  {
    title: "Default",
    value: "default",
    icon: Info,
    variant: "default"
  },
  {
    title: "Destructive",
    value: "destructive",
    icon: AlertCircle,
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
        <ShadcnAlert variant={alertType.variant}>
          <Icon className="h-4 w-4" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <AlertTitle className="cursor-pointer">
                {alertType.title}
              </AlertTitle>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Alert Type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {alertTypes.map((type) => {
                const ItemIcon = type.icon;
                return (
                  <DropdownMenuItem
                    key={type.value}
                    onClick={() =>
                      props.editor.updateBlock(props.block, {
                        type: "alert",
                        props: { type: type.value },
                      })
                    }
                  >
                    <ItemIcon className="mr-2 h-4 w-4" />
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