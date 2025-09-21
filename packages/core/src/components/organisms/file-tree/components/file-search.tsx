import { useEffect } from 'react';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/atoms/input';
import type { FileSearchProps } from '../file-tree.types';

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