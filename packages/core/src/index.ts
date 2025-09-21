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
} from './types';

// Utils - Exported for consumer use
export { cn } from './utils/cn';
