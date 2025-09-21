import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useRef,
  useEffect,
} from 'react';

interface StackNavigatorState {
  screenStack: string[];
  animatingScreens: string[];
  pendingScreen: string | null;
}

interface StackNavigatorContextType {
  currentScreen: string;
  screenStack: string[];
  animatingScreens: string[];
  pendingScreen: string | null;
  canGoBack: boolean;
  pushScreen: (screenId: string) => void;
  popScreen: () => void;
  goToRoot: () => void;
}

const StackNavigatorContext = createContext<StackNavigatorContextType | null>(
  null
);

export interface StackNavigatorProps {
  children: ((context: StackNavigatorContextType) => ReactNode) | ReactNode;
  initialScreen?: string;
  onStackChange?: (stack: string[]) => void;
  resetOnHidden?: boolean;
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({
  children,
  initialScreen = 'main',
  onStackChange,
  resetOnHidden = true,
}) => {
  const [state, setState] = useState<StackNavigatorState>({
    screenStack: [initialScreen],
    animatingScreens: [],
    pendingScreen: null,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Clear any existing timeout
  const pushScreen = useCallback(
    (screenId: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Single state update with pending screen
      setState((prev) => {
        const newStack = [...prev.screenStack, screenId];
        onStackChange?.(newStack);
        return {
          ...prev,
          screenStack: newStack,
          pendingScreen: screenId,
        };
      });

      // Use requestAnimationFrame for better timing
      timeoutRef.current = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          pendingScreen: null,
        }));
      }, 16); // One frame at 60fps
    },
    [onStackChange]
  );

  const popScreen = useCallback(() => {
    setState((prev) => {
      if (prev.screenStack.length <= 1) return prev;

      const poppedScreen = prev.screenStack[prev.screenStack.length - 1];
      const newStack = prev.screenStack.slice(0, -1);
      onStackChange?.(newStack);

      // Single state update
      const newState = {
        ...prev,
        screenStack: newStack,
        animatingScreens: [...prev.animatingScreens, poppedScreen],
        pendingScreen: null,
      };

      // Clean up animating screen after animation
      setTimeout(() => {
        setState((current) => ({
          ...current,
          animatingScreens: current.animatingScreens.filter(
            (screen) => screen !== poppedScreen
          ),
        }));
      }, 300);

      return newState;
    });
  }, [onStackChange]);

  // Reset stack to initial state
  const resetStack = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const newStack = [initialScreen];
    onStackChange?.(newStack);
    setState({
      screenStack: newStack,
      animatingScreens: [],
      pendingScreen: null,
    });
  }, [initialScreen, onStackChange]);

  // Set up Intersection Observer to detect visibility
  useEffect(() => {
    if (!resetOnHidden || !containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && !entry.isIntersecting) {
          // StackNavigator is no longer visible, reset state
          resetStack();
        }
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [resetOnHidden, resetStack]);

  const goToRoot = useCallback(() => {
    resetStack();
  }, [resetStack]);

  // Calculate current screen considering pending state
  const actualCurrentScreen = state.screenStack[state.screenStack.length - 1];
  const currentScreen = state.pendingScreen
    ? state.screenStack[state.screenStack.length - 2]
    : actualCurrentScreen;
  const canGoBack = state.screenStack.length > 1;

  const value = {
    currentScreen,
    screenStack: state.screenStack,
    animatingScreens: state.animatingScreens,
    pendingScreen: state.pendingScreen,
    canGoBack,
    pushScreen,
    popScreen,
    goToRoot,
  };

  return (
    <StackNavigatorContext.Provider value={value}>
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden"
      >
        {typeof children === 'function' ? children(value) : children}
      </div>
    </StackNavigatorContext.Provider>
  );
};

export const useStackNavigator = (): StackNavigatorContextType => {
  const context = useContext(StackNavigatorContext);
  if (!context) {
    throw new Error('useStackNavigator must be used within a StackNavigator');
  }
  return context;
};
