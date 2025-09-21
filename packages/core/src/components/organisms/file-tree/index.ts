// Main component exports
export { FileTree } from './file-tree';
export type { FileTreeProps } from './file-tree.types';

// Sub-component exports
export { FileTreeItem } from './components/file-tree-item';
export { FolderTreeItem } from './components/folder-tree-item';
export { FileSearch } from './components/file-search';

// Type exports
export type {
  FileNode,
  FileTreeItemProps,
  FolderTreeItemProps,
  FileSearchProps,
} from './file-tree.types';

// Utility function exports
export {
  formatFileSize,
  getFileIcon,
  getFileExtension,
} from './file-tree.types';