// Base/primitive components - direct imports from source
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
} from "./_base/dropdown-menu";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
} from "./_base/context-menu";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./_base/accordion";

export {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./_base/collapsible";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./_base/form";

export { Label } from "./_base/label";

// Atoms components - direct imports from source
export { Button, ButtonVariants } from "./atoms/button";
export type { ButtonProps } from "./atoms/button";

export { Input } from "./atoms/input";
export type { InputProps } from "./atoms/input";

export { Separator } from "./atoms/separator";
export type { SeparatorProps } from "./atoms/separator";

export { Skeleton } from "./atoms/skeleton";
export type { SkeletonProps } from "./atoms/skeleton";

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./atoms/tooltip";
export type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipProviderProps,
} from "./atoms/tooltip";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./atoms/sheet";
export type {
  SheetProps,
  SheetTriggerProps,
  SheetCloseProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
} from "./atoms/sheet";

export { DropdownMenu } from "./atoms/dropdown-menu";
export type {
  DropdownMenuProps,
  DropdownData,
  MenuItem,
} from "./atoms/dropdown-menu";

export { Toaster } from "./atoms/toaster";
export type { ToasterProps } from "./atoms/toaster";

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
  getSidebarCSSVariable,
  getSidebarWidth,
  getSidebarState,
  isSidebarOpen,
  isSidebarMobile,
  getAllSidebarIds,
} from "./atoms/sidebar";
export type {
  SidebarContextProps,
  SidebarProviderProps,
  SidebarProps,
  SidebarTriggerProps,
  SidebarInputProps,
  SidebarSeparatorProps,
  SidebarMenuButtonProps,
  SidebarMenuButtonVariants,
} from "./atoms/sidebar";

// Molecules components - direct imports from source
export { DragHandle } from "./molecules/drag-handle";
export type { DragHandleProps } from "./molecules/drag-handle";
export { IconButton } from "./molecules/icon-button";
export type { IconButtonProps } from "./molecules/icon-button";
export { IconLabel } from "./molecules/icon-label";
export type { IconLabelProps } from "./molecules/icon-label";
export {
  Navigation,
  NavItem,
  NavHeader,
  NavDivider,
  NavSectionLabel,
  navItemVariants,
} from "./molecules/navigation";
export type {
  NavigationProps,
  NavItemProps,
  NavHeaderProps,
  NavDividerProps,
  NavSectionLabelProps,
} from "./molecules/navigation";

// Organisms components - direct imports from source
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "./organisms/card";
export type {
  CardProps,
  CardHeaderProps,
  CardFooterProps,
  CardTitleProps,
  CardActionProps,
  CardDescriptionProps,
  CardContentProps,
} from "./organisms/card";

export {
  FileTree,
  FileTreeItem,
  FolderTreeItem,
  FileSearch,
  formatFileSize,
  getFileExtension,
  getFileIcon,
} from "./organisms/file-tree";
export type {
  FileTreeProps,
  FileTreeItemProps,
  FolderTreeItemProps,
  FileNode,
  FileSearchProps,
} from "./organisms/file-tree";

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
} from "./organisms/magic-drawer";
export type {
  MagicDrawerProps,
  DrawerPosition,
  MagicDrawerTriggerProps,
  MagicDrawerContentProps,
  MagicDrawerContextType,
  MagicDrawerState,
} from "./organisms/magic-drawer";

export {
  StackNavigator,
  StackScreen,
  useStackNavigator,
} from "./organisms/stack-navigator";
export type {
  StackNavigatorProps,
  StackScreenProps,
  StackNavigatorContextType,
  StackNavigatorState,
} from "./organisms/stack-navigator";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./organisms/tabs";
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./organisms/tabs";

export { UserProfileLabel } from "./organisms/user-profile-label";
export type { UserProfileLabelProps } from "./organisms/user-profile-label";

// Templates components - direct imports from source
export { SidebarPageTemplate } from "./templates/sidebar-page-template";
export type { SidebarPageTemplateProps } from "./templates/sidebar-page-template";
