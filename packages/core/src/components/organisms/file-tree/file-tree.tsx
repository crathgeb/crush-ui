import React, { useEffect } from "react";
import { cn } from "@/utils";
import { useDebounceValue } from "usehooks-ts";
import { NavItem } from "@/components/molecules/navigation/components/nav-item";
import type { FileTreeProps } from "./file-tree.types";
import { FileTreeItem } from "./components/file-tree-item";
import { FolderTreeItem } from "./components/folder-tree-item";
import { formatFileSize } from "./file-tree.types";

export const FileTree = ({
  item,
  isSelected,
  isExpanded,
  isFocused,
  isSearching,
  customFolderTreeItem,
  customFileNode,
  ...rest
}: FileTreeProps) => {
  const [isTarget, setIsTarget] = useDebounceValue(item.isDragTarget(), 100);

  useEffect(() => {
    setIsTarget(item.isDragTarget());
  }, [item.isDragTarget()]);

  return (
    <NavItem asChild variant={isSelected ? "active" : "default"} {...rest}>
      <div
        className={cn("treeitem", {
          "treeitem-search-match": isSearching && item.isMatchingSearch(),
          "treeitem-focused": isFocused,
          "treeitem-drop-target": isTarget,
        })}
        style={{
          paddingLeft: `${item.getItemMeta().level * 20 + 14}px`,
          display: isSearching && !item.isMatchingSearch() ? "none" : "block",
        }}
      >
        {item.isFolder() ? (
          customFolderTreeItem ? (
            customFolderTreeItem(item)
          ) : (
            <FolderTreeItem
              label={item.getItemName()}
              isExpanded={isExpanded}
              childrenCount={item.getItemData().children?.length || 0}
            />
          )
        ) : customFileNode ? (
          customFileNode(item)
        ) : (
          <FileTreeItem
            label={item.getItemName()}
            rightSide={
              <span className="treeitem-right-label">
                {formatFileSize(item.getItemData().size ?? 0)}
              </span>
            }
          />
        )}
      </div>
    </NavItem>
  );
};
