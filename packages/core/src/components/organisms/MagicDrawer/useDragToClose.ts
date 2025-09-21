import { useEffect, useRef, useState } from 'react';
import type { DrawerPosition } from './MagicDrawer';

interface UseDragToCloseOptions {
  isVisible: boolean;
  onClose: () => void;
  threshold?: number;
  position?: DrawerPosition;
  sizeBreakpoints?: number[];
  currentBreakpointIndex?: number;
  onBreakpointChange?: (index: number) => void;
  shouldAutoJump?: boolean;
}

export const useDragToClose = ({
  isVisible,
  onClose,
  threshold = 100, // Reduced threshold for better UX with breakpoints
  position = 'bottom',
  sizeBreakpoints = [50],
  currentBreakpointIndex = 0,
  onBreakpointChange,
  shouldAutoJump = false,
}: UseDragToCloseOptions) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const startOffset = useRef(0);
  const currentTouchY = useRef(0);
  const currentTouchX = useRef(0);

  // Reset drag state when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setDragOffset(0);
      setIsDragging(false);
    }
  }, [isVisible]);

  // Helper function to determine if we're dragging in the expanding direction
  const isDragExpanding = (delta: number) => {
    switch (position) {
      case 'top':
        return delta > 0; // Dragging down expands top drawer (makes it taller)
      case 'left':
        return delta > 0; // Dragging right expands left drawer
      case 'right':
        return delta < 0; // Dragging left expands right drawer
      case 'bottom':
      default:
        return delta < 0; // Dragging up expands bottom drawer
    }
  };

  // Helper function to determine if we're dragging in the collapsing direction
  const isDragCollapsing = (delta: number) => {
    switch (position) {
      case 'top':
        return delta < 0; // Dragging up collapses top drawer (makes it shorter)
      case 'left':
        return delta < 0; // Dragging left collapses left drawer
      case 'right':
        return delta > 0; // Dragging right collapses right drawer
      case 'bottom':
      default:
        return delta > 0; // Dragging down collapses bottom drawer
    }
  };

  // Calculate drag offset - provides visual feedback for all drag operations
  const calculateOffset = (currentCoord: number, startCoord: number) => {
    const delta = currentCoord - startCoord;

    // For breakpoint systems, show visual feedback in both directions
    if (sizeBreakpoints.length > 1) {
      // When expanding (moving to larger breakpoint)
      if (isDragExpanding(delta)) {
        // Only show visual feedback if there's a next breakpoint available
        if (currentBreakpointIndex < sizeBreakpoints.length - 1) {
          // Return the raw delta for expanding direction
          return Math.abs(delta) * -1; // Always negative for expanding
        }
        return 0;
      }

      // When collapsing (moving to smaller breakpoint or closing)
      if (isDragCollapsing(delta)) {
        // Return the raw delta for collapsing direction
        return Math.abs(delta); // Always positive for collapsing
      }
    } else {
      // Single breakpoint mode - only show visual feedback when closing
      if (isDragCollapsing(delta)) {
        return Math.abs(delta); // Always positive for collapsing
      }
    }

    // No visual offset for neutral directions
    return 0;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isVisible) return;

    const touch = e.touches[0];
    const isHorizontal = position === 'left' || position === 'right';

    if (isHorizontal) {
      startX.current = touch.clientX;
      currentTouchX.current = touch.clientX;
    } else {
      startY.current = touch.clientY;
      currentTouchY.current = touch.clientY;
    }

    startOffset.current = dragOffset;
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isVisible) return;

    const touch = e.touches[0];
    const isHorizontal = position === 'left' || position === 'right';

    // Update current position
    if (isHorizontal) {
      currentTouchX.current = touch.clientX;
    } else {
      currentTouchY.current = touch.clientY;
    }

    const currentCoord = isHorizontal ? touch.clientX : touch.clientY;
    const startCoord = isHorizontal ? startX.current : startY.current;

    const newOffset = calculateOffset(currentCoord, startCoord);
    setDragOffset(newOffset);

    // Try to prevent default, but don't fail if the event is passive
    try {
      e.preventDefault();
    } catch (error) {
      // Ignore passive event listener errors
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const isHorizontal = position === 'left' || position === 'right';
    const startCoord = isHorizontal ? startX.current : startY.current;
    const endCoord = isHorizontal
      ? currentTouchX.current
      : currentTouchY.current;
    const delta = endCoord - startCoord;

    // Check if we've crossed the threshold
    if (Math.abs(delta) > threshold) {
      if (isDragExpanding(delta)) {
        // Dragging to expand - move to next breakpoint if available
        const nextIndex = currentBreakpointIndex + 1;
        if (nextIndex < sizeBreakpoints.length) {
          onBreakpointChange?.(nextIndex);
        }
      } else if (isDragCollapsing(delta)) {
        // Dragging to collapse
        if (currentBreakpointIndex > 0) {
          // In auto-jump mode, allow direct closing from largest breakpoint
          if (
            shouldAutoJump &&
            currentBreakpointIndex === sizeBreakpoints.length - 1
          ) {
            onClose();
          } else {
            // Move to previous breakpoint
            onBreakpointChange?.(currentBreakpointIndex - 1);
          }
        } else {
          // Close if we're at the first breakpoint
          onClose();
        }
      }
    }

    // Reset drag offset
    setDragOffset(0);
  };

  // Mouse event handlers for testing on desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isVisible) return;

    const isHorizontal = position === 'left' || position === 'right';

    if (isHorizontal) {
      startX.current = e.clientX;
      currentTouchX.current = e.clientX;
    } else {
      startY.current = e.clientY;
      currentTouchY.current = e.clientY;
    }

    startOffset.current = dragOffset;
    setIsDragging(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !isVisible) return;

    const isHorizontal = position === 'left' || position === 'right';

    // Update current position
    if (isHorizontal) {
      currentTouchX.current = e.clientX;
    } else {
      currentTouchY.current = e.clientY;
    }

    const currentCoord = isHorizontal ? e.clientX : e.clientY;
    const startCoord = isHorizontal ? startX.current : startY.current;

    const newOffset = calculateOffset(currentCoord, startCoord);
    setDragOffset(newOffset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const isHorizontal = position === 'left' || position === 'right';
    const startCoord = isHorizontal ? startX.current : startY.current;
    const endCoord = isHorizontal
      ? currentTouchX.current
      : currentTouchY.current;
    const delta = endCoord - startCoord;

    // Check if we've crossed the threshold
    if (Math.abs(delta) > threshold) {
      if (isDragExpanding(delta)) {
        // Dragging to expand - move to next breakpoint if available
        const nextIndex = currentBreakpointIndex + 1;
        if (nextIndex < sizeBreakpoints.length) {
          onBreakpointChange?.(nextIndex);
        }
      } else if (isDragCollapsing(delta)) {
        // Dragging to collapse
        if (currentBreakpointIndex > 0) {
          // In auto-jump mode, allow direct closing from largest breakpoint
          if (
            shouldAutoJump &&
            currentBreakpointIndex === sizeBreakpoints.length - 1
          ) {
            onClose();
          } else {
            // Move to previous breakpoint
            onBreakpointChange?.(currentBreakpointIndex - 1);
          }
        } else {
          // Close if we're at the first breakpoint
          onClose();
        }
      }
    }

    // Reset drag offset
    setDragOffset(0);
  };

  // Add/remove mouse move and up listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [
    isDragging,
    dragOffset,
    threshold,
    currentBreakpointIndex,
    sizeBreakpoints.length,
  ]);

  return {
    dragOffset,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
  };
};
