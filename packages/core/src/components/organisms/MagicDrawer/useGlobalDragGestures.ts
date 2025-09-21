import { useEffect, useRef, useState, useCallback } from 'react';
import type { DrawerPosition } from './MagicDrawer';

interface UseGlobalDragGesturesOptions {
  isVisible: boolean;
  onClose: () => void;
  threshold?: number;
  position?: DrawerPosition;
  sizeBreakpoints?: number[];
  currentBreakpointIndex?: number;
  onBreakpointChange?: (index: number) => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  enabled?: boolean;
  shouldAutoJump?: boolean;
}

export const useGlobalDragGestures = ({
  isVisible,
  onClose,
  threshold = 100,
  position = 'bottom',
  sizeBreakpoints = [50],
  currentBreakpointIndex = 0,
  onBreakpointChange,
  contentRef,
  enabled = true,
  shouldAutoJump = false,
}: UseGlobalDragGesturesOptions) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const currentTouchY = useRef(0);
  const currentTouchX = useRef(0);
  const dragStartElement = useRef<HTMLElement | null>(null);

  // Track drag gesture state to prevent clicks
  const isDragGestureActive = useRef(false);
  const hadDragGesture = useRef(false); // Track if we ever had a real drag gesture
  const dragStartTime = useRef(0);
  const dragDistance = useRef(0);

  // Reset drag state when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setDragOffset(0);
      setIsDragging(false);
      isDragGestureActive.current = false;
      hadDragGesture.current = false;
      dragStartElement.current = null; // Also clear the drag start element
    }
  }, [isVisible]);

  // Helper function to determine if we're dragging in the expanding direction
  const isDragExpanding = (delta: number) => {
    switch (position) {
      case 'top':
        return delta > 0; // Dragging down expands top drawer
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
        return delta < 0; // Dragging up collapses top drawer
      case 'left':
        return delta < 0; // Dragging left collapses left drawer
      case 'right':
        return delta > 0; // Dragging right collapses right drawer
      case 'bottom':
      default:
        return delta > 0; // Dragging down collapses bottom drawer
    }
  };

  // Check if the target element is interactive (button, input, etc.)
  const isInteractiveElement = (element: HTMLElement): boolean => {
    const interactiveTags = [
      'BUTTON',
      'INPUT',
      'SELECT',
      'TEXTAREA',
      'A',
      'DIV',
    ];
    const interactiveRoles = [
      'button',
      'link',
      'textbox',
      'combobox',
      'listbox',
    ];

    // Check tag name
    if (interactiveTags.includes(element.tagName)) {
      return true;
    }

    // Check role attribute
    const role = element.getAttribute('role');
    if (role && interactiveRoles.includes(role)) {
      return true;
    }

    // Check if element has click handlers or is focusable
    if (element.onclick || element.tabIndex >= 0) {
      return true;
    }

    // Check for data attributes that indicate interactivity
    if (
      element.hasAttribute('data-magic-drawer-trigger') ||
      element.hasAttribute('data-interactive') ||
      element.classList.contains('interactive')
    ) {
      return true;
    }

    return false;
  };

  // For global gestures, we want to allow dragging from anywhere
  // We'll handle click prevention more carefully based on actual drag behavior
  const shouldAllowDrag = (element: HTMLElement): boolean => {
    return true; // Always allow drag for global gestures
  };

  // Calculate drag offset
  const calculateOffset = (currentCoord: number, startCoord: number) => {
    const delta = currentCoord - startCoord;

    if (sizeBreakpoints.length > 1) {
      if (isDragExpanding(delta)) {
        if (currentBreakpointIndex < sizeBreakpoints.length - 1) {
          return Math.abs(delta) * -1; // Negative for expanding
        }
        return 0;
      }

      if (isDragCollapsing(delta)) {
        return Math.abs(delta); // Positive for collapsing
      }
    } else {
      if (isDragCollapsing(delta)) {
        return Math.abs(delta); // Positive for collapsing
      }
    }

    return 0;
  };

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!isVisible || !enabled || !contentRef.current) return;

      const target = e.target as HTMLElement;

      // Check if the touch started within our content area
      const isInContentArea = contentRef.current.contains(target);
      if (!isInContentArea) return;

      // Check if we should allow dragging from this element
      if (!shouldAllowDrag(target)) return;

      const touch = e.touches[0];
      const isHorizontal = position === 'left' || position === 'right';

      if (isHorizontal) {
        startX.current = touch.clientX;
        currentTouchX.current = touch.clientX;
      } else {
        startY.current = touch.clientY;
        currentTouchY.current = touch.clientY;
      }

      dragStartElement.current = target;
      dragStartTime.current = Date.now();
      dragDistance.current = 0;
      isDragGestureActive.current = false; // Will be set to true if we detect actual dragging
      hadDragGesture.current = false; // Reset drag gesture flag
      setIsDragging(true);

      // Don't prevent default yet - let's see if this becomes a drag
    },
    [isVisible, enabled, position, contentRef]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !isVisible) return;

      const touch = e.touches[0];
      const isHorizontal = position === 'left' || position === 'right';

      if (isHorizontal) {
        currentTouchX.current = touch.clientX;
      } else {
        currentTouchY.current = touch.clientY;
      }

      const currentCoord = isHorizontal ? touch.clientX : touch.clientY;
      const startCoord = isHorizontal ? startX.current : startY.current;

      // Calculate how far we've moved
      const deltaX = Math.abs(touch.clientX - startX.current);
      const deltaY = Math.abs(touch.clientY - startY.current);
      const totalDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      dragDistance.current = totalDistance;

      // If we've moved more than 15px, consider this a drag gesture for UI feedback
      if (totalDistance > 15 && !isDragGestureActive.current) {
        isDragGestureActive.current = true;
        // Now prevent default to take over from any click handlers
        e.preventDefault();
        e.stopPropagation();
      }

      // Only mark as a "real drag gesture" (that should block clicks) if we have significant movement
      // Use a higher threshold to avoid blocking clicks on small movements
      if (totalDistance > 40 && !hadDragGesture.current) {
        hadDragGesture.current = true; // Mark that we had a real drag gesture
      }

      const newOffset = calculateOffset(currentCoord, startCoord);
      setDragOffset(newOffset);

      // Prevent default if we're in a drag gesture
      if (isDragGestureActive.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isDragging, isVisible, position]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    const isHorizontal = position === 'left' || position === 'right';
    const startCoord = isHorizontal ? startX.current : startY.current;
    const endCoord = isHorizontal
      ? currentTouchX.current
      : currentTouchY.current;
    const delta = endCoord - startCoord;

    // Only process breakpoint changes if this was actually a drag gesture
    if (isDragGestureActive.current && Math.abs(delta) > threshold) {
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

    // Clean up any drag attributes and event listeners
    if (dragStartElement.current) {
      dragStartElement.current.removeAttribute('data-drag-started');
      dragStartElement.current.style.pointerEvents = '';

      // Remove the click prevention listener if it exists
      const preventClick = (dragStartElement.current as any).__preventClick;
      if (preventClick) {
        dragStartElement.current.removeEventListener('click', preventClick, {
          capture: true,
        });
        delete (dragStartElement.current as any).__preventClick;
      }
    }
    dragStartElement.current = null;

    // Reset drag gesture tracking immediately to allow clicks
    // We use isDragGestureActive for immediate click prevention, hadDragGesture for cleanup
    isDragGestureActive.current = false; // Always reset immediately to allow clicks

    if (dragDistance.current <= 40) {
      // No significant movement - reset drag gesture flag immediately
      hadDragGesture.current = false;
    } else {
      // Significant movement occurred - brief delay for cleanup only
      setTimeout(() => {
        hadDragGesture.current = false;
      }, 50);
    }
    dragDistance.current = 0;
  }, [
    isDragging,
    position,
    threshold,
    currentBreakpointIndex,
    sizeBreakpoints.length,
    onBreakpointChange,
    onClose,
  ]);

  // Mouse event handlers for desktop testing
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isVisible || !enabled || !contentRef.current) return;

      const target = e.target as HTMLElement;

      // Check if the mouse down started within our content area
      const isInContentArea = contentRef.current.contains(target);

      if (!isInContentArea) return;

      // Check if we should allow dragging from this element
      if (!shouldAllowDrag(target)) return;

      const isHorizontal = position === 'left' || position === 'right';

      if (isHorizontal) {
        startX.current = e.clientX;
        currentTouchX.current = e.clientX;
      } else {
        startY.current = e.clientY;
        currentTouchY.current = e.clientY;
      }

      dragStartElement.current = target;
      dragStartTime.current = Date.now();
      dragDistance.current = 0;
      isDragGestureActive.current = false; // Will be set to true if we detect actual dragging
      hadDragGesture.current = false; // Reset drag gesture flag
      setIsDragging(true);

      // For interactive elements, mark them but don't prevent default yet
      // We'll prevent their behavior only if actual dragging occurs
      if (isInteractiveElement(target)) {
        target.setAttribute('data-drag-started', 'true');
      }
    },
    [isVisible, enabled, position, contentRef]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !isVisible) return;

      const isHorizontal = position === 'left' || position === 'right';

      if (isHorizontal) {
        currentTouchX.current = e.clientX;
      } else {
        currentTouchY.current = e.clientY;
      }

      const currentCoord = isHorizontal ? e.clientX : e.clientY;
      const startCoord = isHorizontal ? startX.current : startY.current;

      // Calculate how far we've moved
      const deltaX = Math.abs(e.clientX - startX.current);
      const deltaY = Math.abs(e.clientY - startY.current);
      const totalDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      dragDistance.current = totalDistance;

      // If we've moved more than 15px, consider this a drag gesture for UI feedback
      if (totalDistance > 15 && !isDragGestureActive.current) {
        isDragGestureActive.current = true;

        // Now prevent default to take over from any click handlers
        e.preventDefault();
        e.stopPropagation();
      }

      // Only mark as a "real drag gesture" (that should block clicks) if we have significant movement
      // Use a higher threshold to avoid blocking clicks on small movements
      if (totalDistance > 40 && !hadDragGesture.current) {
        hadDragGesture.current = true; // Mark that we had a real drag gesture

        // If we started on an interactive element, we need to prevent its click behavior
        if (
          dragStartElement.current &&
          dragStartElement.current.hasAttribute('data-drag-started')
        ) {
          // Add a click event listener to prevent any clicks during and after drag
          const preventClick = (clickEvent: Event) => {
            clickEvent.preventDefault();
            clickEvent.stopPropagation();
            clickEvent.stopImmediatePropagation();
          };

          dragStartElement.current.addEventListener('click', preventClick, {
            capture: true,
          });

          // Store the prevent function so we can remove it later
          (dragStartElement.current as any).__preventClick = preventClick;

          // Remove the click prevention after a longer delay to ensure it catches the click
          setTimeout(() => {
            if (dragStartElement.current) {
              const storedPreventClick = (dragStartElement.current as any)
                .__preventClick;
              if (storedPreventClick) {
                dragStartElement.current.removeEventListener(
                  'click',
                  storedPreventClick,
                  { capture: true }
                );
                delete (dragStartElement.current as any).__preventClick;
              }
            }
          }, 300);

          // Also disable pointer events temporarily
          dragStartElement.current.style.pointerEvents = 'none';
          setTimeout(() => {
            if (dragStartElement.current) {
              dragStartElement.current.style.pointerEvents = '';
            }
          }, 150);
        }
      }

      const newOffset = calculateOffset(currentCoord, startCoord);
      setDragOffset(newOffset);

      // Prevent default if we're in a drag gesture
      if (isDragGestureActive.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    [isDragging, isVisible, position]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    const isHorizontal = position === 'left' || position === 'right';
    const startCoord = isHorizontal ? startX.current : startY.current;
    const endCoord = isHorizontal
      ? currentTouchX.current
      : currentTouchY.current;
    const delta = endCoord - startCoord;

    // Only process breakpoint changes if this was actually a drag gesture
    if (isDragGestureActive.current && Math.abs(delta) > threshold) {
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

    // Clean up any drag attributes and event listeners
    if (dragStartElement.current) {
      dragStartElement.current.removeAttribute('data-drag-started');
      dragStartElement.current.style.pointerEvents = '';

      // Remove the click prevention listener if it exists
      const preventClick = (dragStartElement.current as any).__preventClick;
      if (preventClick) {
        dragStartElement.current.removeEventListener('click', preventClick, {
          capture: true,
        });
        delete (dragStartElement.current as any).__preventClick;
      }
    }
    dragStartElement.current = null;

    // Reset drag gesture tracking immediately to allow clicks
    // We use isDragGestureActive for immediate click prevention, hadDragGesture for cleanup
    isDragGestureActive.current = false; // Always reset immediately to allow clicks

    if (dragDistance.current <= 40) {
      // No significant movement - reset drag gesture flag immediately
      hadDragGesture.current = false;
    } else {
      // Significant movement occurred - brief delay for cleanup only
      setTimeout(() => {
        hadDragGesture.current = false;
      }, 50);
    }
    dragDistance.current = 0;
  }, [
    isDragging,
    position,
    threshold,
    currentBreakpointIndex,
    sizeBreakpoints.length,
    onBreakpointChange,
    onClose,
  ]);

  // Global event handler to prevent clicks and other interactions during active drag gestures
  const handleGlobalInteraction = useCallback(
    (e: Event) => {
      // Prevent interactions if we're currently in an active drag gesture OR currently dragging
      // This prevents accidental clicks during dragging but allows normal interactions otherwise
      if (isDragGestureActive.current || hadDragGesture.current || isDragging) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    },
    [isDragging]
  );

  // Add global event listeners
  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (!contentRef.current) {
      return;
    }

    document.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    document.addEventListener('mousedown', handleMouseDown);

    // Add click prevention with capture to intercept before other handlers
    document.addEventListener('click', handleGlobalInteraction, {
      capture: true,
    });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('click', handleGlobalInteraction, {
        capture: true,
      });
    };
  }, [
    enabled,
    isVisible,
    contentRef.current, // Add this dependency to re-run when ref becomes available
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleGlobalInteraction,
  ]);

  // Add mouse move and up listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    dragOffset,
    isDragging,
    isGlobalDragging: isDragging,
  };
};
