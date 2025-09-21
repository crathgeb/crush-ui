import type { ReactNode } from "react";

// Re-export component types directly from source for optimal tree-shaking
export type { ButtonProps } from "../components/atoms/button";
export type { InputProps } from "../components/atoms/input";
export type { SeparatorProps } from "../components/atoms/separator";
export type { SkeletonProps } from "../components/atoms/skeleton";

export type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipProviderProps,
} from "../components/atoms/tooltip";

export type {
  SheetProps,
  SheetTriggerProps,
  SheetCloseProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
} from "../components/atoms/sheet";

export type {
  SidebarContextProps,
  SidebarProviderProps,
  SidebarProps,
  SidebarTriggerProps,
  SidebarInputProps,
  SidebarSeparatorProps,
  SidebarMenuButtonProps,
  SidebarMenuButtonVariants,
} from "../components/atoms/sidebar";

export type {
  DropdownMenuProps,
  DropdownData,
  MenuItem,
} from "../components/atoms/dropdown-menu";

export type { ToasterProps } from "../components/atoms/toaster";

// Re-export molecule component types
export type { IconButtonProps } from "../components/molecules/icon-button";
export type { IconLabelProps } from "../components/molecules/icon-label";

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
