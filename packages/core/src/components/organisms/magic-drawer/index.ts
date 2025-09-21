export {
  MagicDrawer,
  useMagicDrawer,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  isDrawerOpen,
  getDrawerIds,
  MagicDrawerControls,
} from './magic-drawer';

export { MagicDrawerContent } from './components/magic-drawer-content';
export { MagicDrawerTrigger } from './components/magic-drawer-trigger';

export { useGlobalDragGestures } from './hooks/useGlobalDragGestures';
export { useSpaceDetection } from './hooks/useSpaceDetection';

export type {
  MagicDrawerProps,
  MagicDrawerTriggerProps,
  MagicDrawerContentProps,
  DrawerPosition,
  MagicDrawerContextType,
  MagicDrawerState,
} from './magic-drawer.types';