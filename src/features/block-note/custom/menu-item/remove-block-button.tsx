import {
    SideMenuProps,
    useBlockNoteEditor,
    useComponentsContext,
} from "@blocknote/react";
import { Trash } from "lucide-react";

export function RemoveBlockButton(props: SideMenuProps) {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext()!;

    return (
        <Components.SideMenu.Button
            label="Remove block"
            icon={
                <Trash
                    size={16}
                    onClick={() => {
                        editor.removeBlocks([props.block]);
                    }}
                />
            }
            className="max-w-6 max-h-6 w-6 h-6 !p-0 flex items-center justify-center"
        />
    );
}
