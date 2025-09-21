import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Button } from '../button';
import { Input } from '../input';
import { Separator } from '../separator';
import { TooltipContent } from '../tooltip';

export type SidebarContextProps = {
  id: string;
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  sidebarWidth: string;
  setSidebarWidth: (width: string) => void;
  isResizing: boolean;
  setIsResizing: (resizing: boolean) => void;
};

export interface SidebarProviderProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  defaultSidebarWidth?: string;
}

export interface SidebarProps extends React.ComponentProps<'div'> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

export interface SidebarTriggerProps extends React.ComponentProps<typeof Button> {
  sidebarId?: string;
}

export interface SidebarInputProps extends React.ComponentProps<typeof Input> {}

export interface SidebarSeparatorProps extends React.ComponentProps<typeof Separator> {}

export interface SidebarMenuButtonProps extends React.ComponentProps<'button'> {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  size?: 'default' | 'sm' | 'lg';
}

// Re-export needed variant types
export type SidebarMenuButtonVariants = VariantProps<any>;