import { Bot, Brain, Cpu, MessageSquare } from "lucide-react";
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

export const agentTypes = [
    {
        name: "ChatGPT",
        value: "chatgpt",
        icon: MessageSquare,
        description: "GPT-4 powered conversational agent",
    },
    {
        name: "Claude",
        value: "claude",
        icon: Brain,
        description: "Anthropic's Claude assistant",
    },
    {
        name: "Gemini",
        value: "gemini",
        icon: Bot,
        description: "Google's advanced AI model",
    },
    {
        name: "Custom",
        value: "custom",
        icon: Cpu,
        description: "Your own AI agent",
    },
] as const;


export type AgentType = typeof agentTypes[number]["value"];


export const Agent = createReactBlockSpec(
    {
        type: "agent",
        propSchema: {
            textAlignment: defaultProps.textAlignment,
            textColor: defaultProps.textColor,
            agentType: {
                default: "chatgpt" as AgentType,
                values: agentTypes.map(agent => agent.value),
            },
        },
        content: "inline"
    },
    {
        render: ({ block, editor }) => {
            const agent = agentTypes.find(
                (a) => a.value === block.props.agentType
            )!;
            const Icon = agent.icon;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild >
                        <span className="flex items-center gap-2 border border-red-600 font-medium p-2 rounded-md bg-black/10 dark:bg-white/10">
                            <Icon className="w-4 h-4" />
                            {agent.name}
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Alert Type</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {agentTypes.map((type) => {
                            const TypeIcon = type.icon;
                            return (
                                <DropdownMenuItem
                                    key={type.value}
                                    onClick={() => {
                                        editor.updateBlock(block, {
                                            type: "agent",
                                            props: { agentType: type.value },
                                        });
                                    }}
                                >
                                    {TypeIcon && <TypeIcon className="w-4 h-4 mr-2" />}
                                    <span>{type.name}</span>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>

            );
        },
    }
);

