import React, { useEffect } from 'react';
import type { FileNode } from './types';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
} from 'lucide-react';
import { cn } from '@/utils';
import { useDebounceValue } from 'usehooks-ts';

export interface FolderTreeItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  isExpanded: boolean;
  icon?: React.ReactElement;
  isDragTarget?: boolean;
  onToggleFolder?: (folder: FileNode, event?: React.MouseEvent) => void;
  childrenCount?: number;
}

export const FolderTreeItem = React.forwardRef<
  HTMLDivElement,
  FolderTreeItemProps
>(
  (
    {
      label,
      isExpanded,
      icon,
      onToggleFolder,
      childrenCount,
      isDragTarget,
      ...props
    },
    ref
  ) => {
    const [isTarget, setIsTarget] = useDebounceValue(isDragTarget, 100);

    useEffect(() => {
      setIsTarget(isDragTarget);
    }, [isDragTarget]);

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          props.className,
          'treeitem-folder',
          isTarget && 'treeitem-folder-drop-target'
        )}
      >
        <div className="ts-inline">
          {isExpanded ? (
            <ChevronDownIcon className="treeitem-folder-chevron" />
          ) : (
            <ChevronRightIcon className="treeitem-folder-chevron" />
          )}
          {icon ? (
            icon
          ) : isExpanded ? (
            <FolderOpenIcon className="treeitem-folder-icon" />
          ) : (
            <FolderIcon className="treeitem-folder-icon" />
          )}
          <span className="treeitem-folder-label">{label}</span>

          {childrenCount !== undefined && childrenCount !== null && (
            <span className="treeitem-folder-children-count">
              ({childrenCount})
            </span>
          )}
        </div>
      </div>
    );
  }
);

FolderTreeItem.displayName = 'FolderTreeItem';
