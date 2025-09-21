// Individual component exports for better tree-shaking
export { Button, ButtonVariants } from './components/atoms/button';
export { Input } from './components/atoms/input';
export { Separator } from './components/atoms/separator';
export { Skeleton } from './components/atoms/skeleton';
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './components/atoms/tooltip';
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './components/atoms/sheet';
export { DropdownMenu } from './components/atoms/dropdown-menu';
export { Toaster } from './components/atoms/toaster';

// Sidebar - large component, explicit export
export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarResizer,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from './components/atoms/sidebar';

// Molecules - Individual component exports for better tree-shaking
export { DragHandle } from './components/molecules/drag-handle';
export { IconButton } from './components/molecules/icon-button';
export { IconLabel } from './components/molecules/icon-label';
export {
  Navigation,
  NavItem,
  NavHeader,
  NavDivider,
  NavSectionLabel,
  navItemVariants,
} from './components/molecules/navigation';

// Organisms - Individual component exports for better tree-shaking
export {
  FileTree,
  FileTreeItem,
  FolderTreeItem,
  FileSearch,
  formatFileSize,
  getFileExtension,
  getFileIcon,
} from './components/organisms/file-tree';

export {
  MagicDrawer,
  MagicDrawerTrigger,
  MagicDrawerContent,
  useMagicDrawer,
  MagicDrawerControls,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  isDrawerOpen,
  getDrawerIds,
  useGlobalDragGestures,
  useSpaceDetection,
} from './components/organisms/magic-drawer';

export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/organisms/tabs';

export { UserProfileLabel } from './components/organisms/user-profile-label';

// Templates - Individual component exports for better tree-shaking
export { SidebarPageTemplate } from './components/templates/sidebar-page-template';

// Base/primitive components (commonly used)
export {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from './components/_base';

// Export types
export type {
  ButtonProps,
  InputProps,
  SeparatorProps,
  SkeletonProps,
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipProviderProps,
  SheetProps,
  SheetTriggerProps,
  SheetCloseProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
  DropdownMenuProps,
  DropdownData,
  MenuItem,
  ToasterProps,
  DragHandleProps,
  IconButtonProps,
  IconLabelProps,
  NavigationProps,
  NavItemProps,
  NavHeaderProps,
  NavDividerProps,
  NavSectionLabelProps,
  FileTreeProps,
  FileTreeItemProps,
  FolderTreeItemProps,
  FileNode,
  FileSearchProps,
  MagicDrawerProps,
  MagicDrawerTriggerProps,
  MagicDrawerContentProps,
  DrawerPosition,
  MagicDrawerContextType,
  MagicDrawerState,
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  SidebarPageTemplateProps,
  Theme,
  ThemeProviderProps,
  ThemeProviderState,
} from './types';

// Providers - Individual component exports for better tree-shaking
export { ThemeProvider, useTheme } from './providers/theme-provider';

// Utils - Exported for consumer use
export { cn } from './utils/cn';
