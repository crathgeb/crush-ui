import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MagicDrawerContent } from "./components/magic-drawer-content";
import { useSpaceDetection } from "./hooks/useSpaceDetection";
import type {
  MagicDrawerContextType,
  MagicDrawerProps,
  MagicDrawerState,
} from "./magic-drawer.types";

const MagicDrawerContext = createContext<MagicDrawerContextType | null>(null);

export const MagicDrawer: React.FC<MagicDrawerProps> = ({
  children,
  id = "magic-drawer",
  height = 50,
  sizeBreakpoints = [50], // Default to single breakpoint for backward compatibility
  defaultOpen = false,
  position = "bottom",
  allowDragAnywhere = true,
  onOpen,
  onClose,
  onBreakpointChange,
}) => {
  // Use sizeBreakpoints if provided, otherwise fall back to height for backward compatibility
  const breakpoints = sizeBreakpoints.length > 0 ? sizeBreakpoints : [height];

  const [state, setState] = useState<MagicDrawerState>({
    height: breakpoints[0],
    isOpen: defaultOpen,
    currentBreakpointIndex: 0,
  });

  const drawerRef = useRef<HTMLDivElement>(null);

  // Space detection for auto-jumping to largest breakpoint
  const { shouldAutoJump } = useSpaceDetection({
    position,
    isOpen: state.isOpen,
    enabled: true,
  });

  const setHeight = useCallback((newHeight: number) => {
    setState((prev) => ({
      ...prev,
      height: newHeight,
    }));
  }, []);

  const setBreakpointIndex = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, breakpoints.length - 1));
      const newHeight = breakpoints[clampedIndex];

      setState((prev) => ({
        ...prev,
        height: newHeight,
        currentBreakpointIndex: clampedIndex,
      }));

      onBreakpointChange?.(clampedIndex, newHeight);
    },
    [breakpoints, onBreakpointChange]
  );

  const moveToNextBreakpoint = useCallback(() => {
    const nextIndex = Math.min(
      state.currentBreakpointIndex + 1,
      breakpoints.length - 1
    );
    if (nextIndex !== state.currentBreakpointIndex) {
      setBreakpointIndex(nextIndex);
    }
  }, [state.currentBreakpointIndex, breakpoints.length, setBreakpointIndex]);

  const moveToPreviousBreakpoint = useCallback(() => {
    const prevIndex = Math.max(state.currentBreakpointIndex - 1, 0);
    if (prevIndex !== state.currentBreakpointIndex) {
      setBreakpointIndex(prevIndex);
    }
  }, [state.currentBreakpointIndex, setBreakpointIndex]);

  const openDrawer = useCallback(() => {
    setState((prev) => {
      if (!prev.isOpen) {
        onOpen?.();
        // Determine initial breakpoint - use largest if should auto-jump
        const initialIndex = shouldAutoJump ? breakpoints.length - 1 : 0;
        const newHeight = breakpoints[initialIndex];

        // Trigger onBreakpointChange if we're jumping to a non-default breakpoint
        if (initialIndex !== 0) {
          onBreakpointChange?.(initialIndex, newHeight);
        }

        return {
          ...prev,
          isOpen: true,
          currentBreakpointIndex: initialIndex,
          height: newHeight,
        };
      }
      return prev;
    });
  }, [onOpen, breakpoints, shouldAutoJump, onBreakpointChange]);

  const closeDrawer = useCallback(() => {
    setState((prev) => {
      if (prev.isOpen) {
        onClose?.();
        return { ...prev, isOpen: false };
      }
      return prev;
    });
  }, [onClose]);

  const toggleDrawer = useCallback(() => {
    setState((prev) => {
      const newOpen = !prev.isOpen;
      if (newOpen) {
        onOpen?.();
      } else {
        onClose?.();
      }
      return { ...prev, isOpen: newOpen };
    });
  }, [onOpen, onClose]);

  // Handle data attribute triggers
  useEffect(() => {
    const handleTriggerClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const trigger = target.closest(`[data-magic-drawer-trigger="${id}"]`);

      if (trigger) {
        event.preventDefault();
        const action =
          trigger.getAttribute("data-magic-drawer-action") || "toggle";

        switch (action) {
          case "open":
            openDrawer();
            break;
          case "close":
            closeDrawer();
            break;
          case "toggle":
          default:
            toggleDrawer();
            break;
        }
      }
    };

    document.addEventListener("click", handleTriggerClick);
    return () => document.removeEventListener("click", handleTriggerClick);
  }, [id, openDrawer, closeDrawer, toggleDrawer]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state.isOpen) {
        closeDrawer();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state.isOpen, closeDrawer]);

  // Handle auto-jump when space changes while drawer is open
  useEffect(() => {
    if (
      state.isOpen &&
      shouldAutoJump &&
      breakpoints.length > 1 &&
      state.currentBreakpointIndex !== breakpoints.length - 1
    ) {
      // Jump to the largest breakpoint
      const largestIndex = breakpoints.length - 1;
      setBreakpointIndex(largestIndex);
    }
  }, [
    state.isOpen,
    shouldAutoJump,
    breakpoints.length,
    state.currentBreakpointIndex,
    setBreakpointIndex,
  ]);

  const value: MagicDrawerContextType = {
    height: state.height,
    isOpen: state.isOpen,
    currentBreakpointIndex: state.currentBreakpointIndex,
    sizeBreakpoints: breakpoints,
    setHeight,
    setBreakpointIndex,
    moveToNextBreakpoint,
    moveToPreviousBreakpoint,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };

  return (
    <MagicDrawerContext.Provider value={value}>
      <div ref={drawerRef} data-magic-drawer-id={id}>
        <MagicDrawerContent
          isOpen={state.isOpen}
          onClose={closeDrawer}
          height={state.height}
          position={position}
          sizeBreakpoints={breakpoints}
          currentBreakpointIndex={state.currentBreakpointIndex}
          onBreakpointChange={setBreakpointIndex}
          allowDragAnywhere={allowDragAnywhere}
          shouldAutoJump={shouldAutoJump}
        >
          {typeof children === "function" ? children(value) : children}
        </MagicDrawerContent>
      </div>
    </MagicDrawerContext.Provider>
  );
};

export const useMagicDrawer = (): MagicDrawerContextType => {
  const context = useContext(MagicDrawerContext);
  if (!context) {
    throw new Error("useMagicDrawer must be used within a MagicDrawer");
  }
  return context;
};

// Global drawer controls (for accessing specific drawer by ID)

// Dynamic trigger functions for programmatic control
/**
 * Creates a temporary trigger element and clicks it to control a drawer
 * @param drawerId - The ID of the drawer to control
 * @param action - The action to perform: 'open', 'close', or 'toggle'
 */
function createDynamicTrigger(
  drawerId: string,
  action: "open" | "close" | "toggle" = "toggle"
): void {
  const tempTrigger = document.createElement("button");
  tempTrigger.setAttribute("data-magic-drawer-trigger", drawerId);
  tempTrigger.setAttribute("data-magic-drawer-action", action);
  tempTrigger.style.display = "none";

  // Add to DOM temporarily, click it, then remove
  document.body.appendChild(tempTrigger);
  tempTrigger.click();
  document.body.removeChild(tempTrigger);
}

/**
 * Opens a mobile bottom drawer programmatically
 * @param drawerId - The ID of the drawer to open
 */
export function openDrawer(drawerId: string): void {
  createDynamicTrigger(drawerId, "open");
}

/**
 * Closes a mobile bottom drawer programmatically
 * @param drawerId - The ID of the drawer to close
 */
export function closeDrawer(drawerId: string): void {
  createDynamicTrigger(drawerId, "close");
}

/**
 * Toggles a mobile bottom drawer programmatically
 * @param drawerId - The ID of the drawer to toggle
 */
export function toggleDrawer(drawerId: string): void {
  createDynamicTrigger(drawerId, "toggle");
}

/**
 * Checks if a mobile bottom drawer is currently open
 * @param drawerId - The ID of the drawer to check
 * @returns boolean indicating if the drawer is open
 */
export function isDrawerOpen(drawerId: string): boolean {
  const drawerElement = document.querySelector(
    `[data-magic-drawer-id="${drawerId}"]`
  );
  if (!drawerElement) return false;

  // Check if the drawer content is visible (not translated off-screen)
  const animatorElement = drawerElement.querySelector('[class*="translate-"]');
  if (!animatorElement) return false;

  const computedStyle = window.getComputedStyle(animatorElement);
  const transform = computedStyle.transform;

  // If transform contains full translation (100%) in any direction, drawer is closed
  return !transform.includes("100%") && transform !== "none";
}

/**
 * Gets all available mobile drawer IDs on the page
 * @returns Array of drawer IDs
 */
export function getDrawerIds(): string[] {
  const drawerElements = document.querySelectorAll("[data-magic-drawer-id]");
  return Array.from(drawerElements)
    .map((el) => el.getAttribute("data-magic-drawer-id"))
    .filter(Boolean) as string[];
}

/**
 * Utility object with all dynamic drawer control functions
 */
export const MagicDrawerControls = {
  openDrawer,
  closeDrawer,
  toggleDrawer,
  isDrawerOpen,
  getDrawerIds,
} as const;
