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
