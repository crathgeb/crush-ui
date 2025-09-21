import React from 'react';
import { cn } from '@/utils';
import type { FileTreeItemProps } from '../file-tree.types';
import { getFileIcon } from '../file-tree.types';

export const FileTreeItem = React.forwardRef<HTMLDivElement, FileTreeItemProps>(
  ({ label, icon, rightSide, onSelectFile, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('treeitem-file', className)} {...props}>
        <div className="ts-inline">
          {icon ? (
            icon
          ) : (
            <span className="treeitem-file-icon">{getFileIcon(label)}</span>
          )}
          <span className="treeitem-file-label">{label}</span>
        </div>
        {rightSide}
      </div>
    );
  }
);

FileTreeItem.displayName = 'FileTreeItem';