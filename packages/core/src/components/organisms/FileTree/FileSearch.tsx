import { useEffect } from 'react';
import type { FileNode } from './types';
import { SearchIcon } from 'lucide-react';
import type { TreeInstance } from '@headless-tree/core';
import { Input } from '@/components/atoms/input';

export interface FileSearchProps {
  tree: TreeInstance<any>;
  files: FileNode[];
  onFilesFiltered: (filteredFiles: FileNode[]) => void;
  className?: string;
  setIsSearching: (isSearching: boolean) => void;
  value?: string;
}

export const FileSearch = ({
  tree,
  files,
  onFilesFiltered,
  className = '',
  setIsSearching,
  value,
  ...rest
}: FileSearchProps) => {
  useEffect(() => {
    setIsSearching((value ?? '').length > 0);
  }, [value]);

  return (
    <div className={`px-3 py-2 ${className}`}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search files..."
          leftIcon={<SearchIcon />}
          {...rest}
          value={value}
          onBlur={(e) => {
            // setIsSearching(false);
          }}
          onChange={(e) => {
            tree.setSearch(e.target.value);
            tree.expandAll();
          }}
        />
      </div>
    </div>
  );
};
