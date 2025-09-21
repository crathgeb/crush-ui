import type { ReactNode } from "react";

// Re-export all component types from atoms
export type {
  ButtonProps,
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipProviderProps,
  SeparatorProps,
  InputProps,
  SheetProps,
  SheetTriggerProps,
  SheetCloseProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SkeletonProps,
  SidebarContextProps,
  SidebarProviderProps,
  SidebarProps,
  SidebarTriggerProps,
  SidebarInputProps,
  SidebarSeparatorProps,
  SidebarMenuButtonProps,
  SidebarMenuButtonVariants,
  DropdownMenuProps,
  DropdownData,
  MenuItem,
  ToasterProps,
} from "../components/atoms";

// Common types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export type ComponentSize = "small" | "medium" | "large";
export type ComponentVariant =
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "ghost";

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  destructive: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: Record<string, string>;
  typography: {
    fontFamily: string;
    fontSize: Record<ComponentSize, string>;
  };
}
