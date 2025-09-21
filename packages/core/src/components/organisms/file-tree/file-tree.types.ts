import React from 'react';
import type { ItemInstance, TreeInstance } from '@headless-tree/core';

// Main FileNode interface
export interface FileNode {
  id: string;
  parent_id?: string;
  external_id?: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  size?: number;
  modified?: Date;
  children?: string[];
  is_open?: boolean;
  is_optimistic?: boolean;
}

// Main FileTree component props
export interface FileTreeProps {
  item: ItemInstance<any>;
  isSelected: boolean;
  isExpanded: boolean;
  isFocused: boolean;
  isSearching: boolean;
  customFolderTreeItem?: (item: ItemInstance<any>) => React.ReactElement;
  customFileNode?: (item: ItemInstance<any>) => React.ReactElement;
}

// FileTreeItem component props
export interface FileTreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon?: React.ReactElement;
  rightSide?: React.ReactElement;
  onSelectFile?: (file: FileNode, event?: React.MouseEvent) => void;
}

// FolderTreeItem component props
export interface FolderTreeItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  isExpanded: boolean;
  icon?: React.ReactElement;
  isDragTarget?: boolean;
  onToggleFolder?: (folder: FileNode, event?: React.MouseEvent) => void;
  childrenCount?: number;
}

// FileSearch component props
export interface FileSearchProps {
  tree: TreeInstance<any>;
  files: FileNode[];
  onFilesFiltered: (filteredFiles: FileNode[]) => void;
  className?: string;
  setIsSearching: (isSearching: boolean) => void;
  value?: string;
}

// Utility functions
export const getFileExtension = (filename: string): string => {
  return filename.split('.').pop()?.toLowerCase() || '';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const getFileIcon = (filename: string): string => {
  const ext = getFileExtension(filename);
  const iconMap: Record<string, string> = {
    tsx: '📱',
    ts: '📘',
    js: '📘',
    jsx: '📱',
    json: '📄',
    md: '📝',
    html: '🌐',
    css: '🎨',
    ico: '🖼️',
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    svg: '🖼️',
  };
  return iconMap[ext] || '📄';
};