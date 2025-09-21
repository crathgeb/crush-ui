# FileTree Components

A comprehensive set of components for building hierarchical file tree interfaces with drag-and-drop support, search functionality, and customizable rendering.

## Components Overview

### TreeItem

The main container component that renders either a folder or file item based on the item type. Supports selection, focus, drag-and-drop, and search highlighting states.

**Key Features:**

- Automatic rendering of folders vs files
- CVA-based variant management for different states
- Drag-and-drop target indication
- Search result highlighting
- Customizable folder and file rendering
- Hierarchical indentation based on tree level

**Variants:**

- `isFocused`: Highlights the item when focused
- `isTarget`: Shows drag-and-drop target indication
- `isSearchMatch`: Highlights search result matches

### FolderTreeItem

Renders folder items with expand/collapse functionality and visual indicators.

**Key Features:**

- Expand/collapse chevron icons
- Folder icons (closed/open states)
- Children count display
- Drag target indication
- CVA-based variant management

**Variants:**

- `isTarget`: Shows drag-and-drop target indication

### FileTreeItem

Renders individual file items with customizable icons and right-side content.

**Key Features:**

- Automatic file type icon detection
- Custom icon support
- Right-side content area (e.g., file size)
- Truncated label display

### FileSearch

A search input component that filters the file tree in real-time.

**Key Features:**

- Real-time search filtering
- Automatic tree expansion on search
- Search state management
- Styled input with search icon

## Usage Examples

### Basic Tree Item

```tsx
<TreeItem
  item={treeItem}
  isSelected={false}
  isExpanded={true}
  isFocused={false}
  isSearching={false}
/>
```

### Custom Folder Rendering

```tsx
<TreeItem
  item={treeItem}
  isSelected={false}
  isExpanded={true}
  isFocused={false}
  isSearching={false}
  customFolderTreeItem={(item) => <CustomFolderRenderer item={item} />}
/>
```

### File Search Integration

```tsx
<FileSearch
  tree={treeInstance}
  files={fileList}
  onFilesFiltered={setFilteredFiles}
  setIsSearching={setIsSearching}
/>
```

## Dependencies

- `@headless-tree/core`: Core tree functionality
- `usehooks-ts`: Debounced state management
- `lucide-react`: Icon components
- `class-variance-authority`: Variant management

## Architecture Notes

- Components use CVA for type-safe variant management
- Drag-and-drop states are debounced for performance
- Search functionality integrates with headless tree search
- All components support composition and customization
- Styles are organized in the `@layer components` CSS layer

## Integration with Navigation

The TreeItem component integrates with the NavItem component from the molecules layer, providing consistent navigation behavior and styling across the application.
