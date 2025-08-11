import { TreeItem } from '../types';
import { FileIcon, ChevronRightIcon, FolderIcon } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";


interface TreeViewProps {
    data: TreeItem[];
    value?: string | null;
    onSelect?: (filePath: string) => void;
};

export const TreeView = ({
    data,
    value,
    onSelect
}: TreeViewProps) => {
    return (
        <div className="h-full p-2">
            <div className="space-y-1">
                {data.map((item, index) => (
                    <Tree
                      key={index}
                      item={item}
                      selectedValue={value ?? null}
                      OnSelect={onSelect}
                      parentPath=""
                    />
                ))}
            </div>
        </div>
    );
};

interface TreeProps {
    item: TreeItem;
    selectedValue: string | null;
    OnSelect?: (value: string) => void;
    parentPath: string;
}

const Tree = ({ item, selectedValue, OnSelect, parentPath }: TreeProps) => {
    const [name, ...items] = Array.isArray(item) ? item : [item];
    const currentPath = parentPath ? `${parentPath}/${name}` : name;

    if (!items.length) {
        // Its a file
        const isSelected = selectedValue === currentPath;

        return (
            <button
              className={`w-full flex items-center gap-2 px-2 py-1 text-left text-sm rounded hover:bg-accent ${
                isSelected ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => OnSelect?.(currentPath)}
            >
                <FileIcon className="h-4 w-4" />
                <span className="truncate">
                    {name}
                </span>
            </button>
        )
    }

    //its a folder
    return (
        <div>
            <Collapsible
              className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
              defaultOpen={true}
            >
                <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center gap-2 px-2 py-1 text-left text-sm rounded hover:bg-accent">
                        <ChevronRightIcon className="h-4 w-4 transition-transform" />
                        <FolderIcon className="h-4 w-4" />
                        <span className="truncate">
                            {name}
                        </span>
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="ml-4 space-y-1">
                        {items.map((subItem, index) => (
                            <Tree
                              key={index}
                              item={subItem}
                              selectedValue={selectedValue}
                              OnSelect={OnSelect}
                              parentPath={currentPath}
                            />
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
};