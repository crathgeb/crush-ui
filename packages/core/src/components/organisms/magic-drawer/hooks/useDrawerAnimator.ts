import { useEffect, useRef } from 'react';
import type { DrawerPosition } from '../magic-drawer.types';
import { useMagicDrawer } from '../magic-drawer';
import { useDragToClose } from './useDragToClose';

interface UseDrawerAnimatorProps {
  isOpen: boolean;
  onClose: () => void;
  height?: number;
  position?: DrawerPosition;
  sizeBreakpoints?: number[];
  currentBreakpointIndex?: number;
  onBreakpointChange?: (index: number) => void;
  globalDragOffset?: number;
  isGlobalDragging?: boolean;
  shouldAutoJump?: boolean;
}

export const useDrawerAnimator = ({
  isOpen,
  onClose,
  height = 50,
  position = 'bottom',
  sizeBreakpoints = [50],
  currentBreakpointIndex = 0,
  onBreakpointChange,
  globalDragOffset = 0,
  isGlobalDragging = false,
  shouldAutoJump = false,
}: UseDrawerAnimatorProps) => {
  const {
    dragOffset,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
  } = useDragToClose({
    isVisible: isOpen,
    onClose,
    position,
    sizeBreakpoints,
    currentBreakpointIndex,
    onBreakpointChange,
    shouldAutoJump,
  });

  const { height: contextHeight } = useMagicDrawer();
  const containerRef = useRef<HTMLDivElement>(null);

  // Use context height if available, otherwise fall back to prop
  const activeHeight = contextHeight || height;

  // Position-based styling helper
  const getPositionClasses = () => {
    const isHorizontal = position === 'left' || position === 'right';

    switch (position) {
      case 'top':
        return {
          container: 'right-0 top-0 left-0',
          transform: isOpen ? 'translate-y-0' : '-translate-y-full',
        };
      case 'left':
        return {
          container: 'top-0 bottom-0 left-0',
          transform: isOpen ? 'translate-x-0' : '-translate-x-full',
        };
      case 'right':
        return {
          container: 'top-0 bottom-0 right-0',
          transform: isOpen ? 'translate-x-0' : 'translate-x-full',
        };
      case 'bottom':
      default:
        return {
          container: 'right-0 bottom-0 left-0',
          transform: isOpen ? 'translate-y-0' : 'translate-y-full',
        };
    }
  };

  const { container: containerClasses, transform: transformClass } =
    getPositionClasses();
  const isHorizontal = position === 'left' || position === 'right';

  // Dynamic height/width management with smooth transitions
  useEffect(() => {
    if (containerRef.current && isOpen) {
      const container = containerRef.current;

      // Determine if any dragging is happening (local or global)
      const anyDragging = isDragging || isGlobalDragging;
      // Use global drag offset if global dragging, otherwise use local drag offset
      const activeDragOffset = isGlobalDragging ? globalDragOffset : dragOffset;

      // Add transition for smooth size changes (but not during dragging)
      container.style.transition = anyDragging
        ? 'none'
        : isHorizontal
          ? 'width 300ms ease-out'
          : 'height 300ms ease-out';

      // Use requestAnimationFrame for optimal timing
      const updateSize = () => {
        if (isHorizontal) {
          let newWidth = (window.innerWidth * activeHeight) / 100;

          // Adjust size during drag for both expanding and collapsing gestures
          if (anyDragging) {
            if (activeDragOffset < 0) {
              // Expanding - add the drag offset to the width
              const dragAmount = Math.abs(activeDragOffset);
              newWidth += dragAmount;
            } else if (activeDragOffset > 0) {
              // Collapsing - subtract the drag offset from the width
              const dragAmount = Math.abs(activeDragOffset);
              newWidth = Math.max(0, newWidth - dragAmount);
            }
          }

          container.style.width = `${newWidth}px`;
          container.style.height = '100%';
        } else {
          let newHeight = (window.innerHeight * activeHeight) / 100;

          // Adjust size during drag for both expanding and collapsing gestures
          if (anyDragging) {
            if (activeDragOffset < 0) {
              // Expanding - add the drag offset to the height
              const dragAmount = Math.abs(activeDragOffset);
              newHeight += dragAmount;
            } else if (activeDragOffset > 0) {
              // Collapsing - subtract the drag offset from the height
              const dragAmount = Math.abs(activeDragOffset);
              newHeight = Math.max(0, newHeight - dragAmount);
            }
          }

          container.style.height = `${newHeight}px`;
          container.style.width = '100%';
        }
      };

      // Update immediately if dragging, otherwise use small delay
      if (anyDragging) {
        requestAnimationFrame(updateSize);
      } else {
        // Small delay to let drawer transition start, then update
        const timeoutId = setTimeout(() => {
          requestAnimationFrame(updateSize);
        }, 20);

        return () => {
          clearTimeout(timeoutId);
        };
      }

      return () => {
        // Clean up transition when component unmounts
        if (containerRef.current) {
          containerRef.current.style.transition = '';
        }
      };
    }
  }, [
    isOpen,
    activeHeight,
    isHorizontal,
    isDragging,
    dragOffset,
    isGlobalDragging,
    globalDragOffset,
  ]);

  // Position-based drag offset styling - drawer follows drag direction
  const getDragTransform = () => {
    if (!isDragging && dragOffset === 0) return {};

    // Now we handle both expanding and collapsing through size changes
    // No position transforms needed since size changes provide the visual feedback
    return {};
  };

  return {
    containerRef,
    containerClasses,
    transformClass,
    isDragging,
    dragOffset,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    getDragTransform,
    position,
  };
};
