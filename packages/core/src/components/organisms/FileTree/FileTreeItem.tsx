import React from 'react';
import type { FileNode as FileNodeType } from './types';
import { getFileIcon } from './fileUtils';
import { cn } from '@/utils';

export interface FileTreeItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactElement;
  rightSide?: React.ReactElement;
  onSelectFile?: (file: FileNodeType, event?: React.MouseEvent) => void;
}

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
