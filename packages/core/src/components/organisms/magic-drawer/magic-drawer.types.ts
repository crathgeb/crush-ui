import { type ReactNode, type ReactElement } from 'react';

export type DrawerPosition = 'bottom' | 'top' | 'left' | 'right';

export interface MagicDrawerState {
  height: number;
  isOpen: boolean;
  currentBreakpointIndex: number;
}

export interface MagicDrawerContextType {
  height: number;
  isOpen: boolean;
  currentBreakpointIndex: number;
  sizeBreakpoints: number[];
  setHeight: (height: number) => void;
  setBreakpointIndex: (index: number) => void;
  moveToNextBreakpoint: () => void;
  moveToPreviousBreakpoint: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export interface MagicDrawerProps {
  children:
    | ((context: MagicDrawerContextType) => ReactElement)
    | ReactElement
    | ReactNode;
  id?: string;
  height?: number; // 1-100% - deprecated in favor of sizeBreakpoints
  sizeBreakpoints?: number[]; // Array of size percentages (1-100)
  defaultOpen?: boolean;
  position?: DrawerPosition;
  allowDragAnywhere?: boolean; // Enable global drag gestures on content area
  onOpen?: () => void;
  onClose?: () => void;
  onBreakpointChange?: (index: number, size: number) => void;
}

export interface MagicDrawerTriggerProps {
  children: ReactNode;
  drawerId?: string;
  action?: 'open' | 'close' | 'toggle';
  className?: string;
  asChild?: boolean;
}

export interface MagicDrawerContentProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number; // 1-100%
  className?: string;
  position?: DrawerPosition;
  sizeBreakpoints?: number[];
  currentBreakpointIndex?: number;
  onBreakpointChange?: (index: number) => void;
  allowDragAnywhere?: boolean;
  shouldAutoJump?: boolean;
}