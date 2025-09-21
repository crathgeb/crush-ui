import type { ReactNode } from 'react';

export interface StackNavigatorState {
  screenStack: string[];
  animatingScreens: string[];
  pendingScreen: string | null;
}

export interface StackNavigatorContextType {
  currentScreen: string;
  screenStack: string[];
  animatingScreens: string[];
  pendingScreen: string | null;
  canGoBack: boolean;
  pushScreen: (screenId: string) => void;
  popScreen: () => void;
  goToRoot: () => void;
}

export interface StackNavigatorProps {
  children: ((context: StackNavigatorContextType) => ReactNode) | ReactNode;
  initialScreen?: string;
  onStackChange?: (stack: string[]) => void;
  resetOnHidden?: boolean;
}

export interface StackScreenProps {
  screenId: string;
  children: ReactNode;
  onShown?: () => void;
  onHidden?: () => void;
  className?: string;
  scrollable?: boolean;
}