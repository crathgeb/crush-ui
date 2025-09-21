import React, { useEffect } from 'react';
import { cn } from '@/utils';
import { FileTreeItem } from './FileTreeItem';
import { FolderTreeItem } from './FolderTreeItem';
import { useDebounceValue } from 'usehooks-ts';
import { NavItem } from '@/components/molecules/Navigation/NavItem';
import { formatFileSize } from './fileUtils';
import type { ItemInstance } from '@headless-tree/core';

export interface TreeItemProps {
  item: ItemInstance<any>;
  isSelected: boolean;
  isExpanded: boolean;
  isFocused: boolean;
  isSearching: boolean;
  customFolderTreeItem?: (item: ItemInstance<any>) => React.ReactElement;
  customFileNode?: (item: ItemInstance<any>) => React.ReactElement;
}

export const TreeItem = ({
  item,
  isSelected,
  isExpanded,
  isFocused,
  isSearching,
  customFolderTreeItem,
  customFileNode,
  ...rest
}: TreeItemProps) => {
  const [isTarget, setIsTarget] = useDebounceValue(item.isDragTarget(), 100);

  useEffect(() => {
    setIsTarget(item.isDragTarget());
  }, [item.isDragTarget()]);

  return (
    <NavItem asChild variant={isSelected ? 'active' : 'default'} {...rest}>
      <div
        className={cn('treeitem', {
          'treeitem-search-match': isSearching && item.isMatchingSearch(),
          'treeitem-focused': isFocused,
          'treeitem-drop-target': isTarget,
        })}
        style={{
          paddingLeft: `${item.getItemMeta().level * 20 + 14}px`,
          display: isSearching && !item.isMatchingSearch() ? 'none' : 'block',
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
