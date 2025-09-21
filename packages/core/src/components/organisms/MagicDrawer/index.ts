// Drawer components - handle drawer animation and drag-to-close
export {
  MagicDrawer,
  useMagicDrawer,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  isDrawerOpen,
  getDrawerIds,
  MagicDrawerControls,
} from './MagicDrawer';
export { MagicDrawerContent } from './MagicDrawerContent';
export { useGlobalDragGestures } from './useGlobalDragGestures';
export { useSpaceDetection } from './useSpaceDetection';

// Trigger components - handle trigger elements
export {
  MagicDrawerTrigger,
  MagicDrawerOpenTrigger,
  MagicDrawerCloseTrigger,
  MagicDrawerToggleTrigger,
} from './MagicDrawerTrigger';

// Type exports
export type { MagicDrawerProps, DrawerPosition } from './MagicDrawer';
export type { MagicDrawerTriggerProps } from './MagicDrawerTrigger';
