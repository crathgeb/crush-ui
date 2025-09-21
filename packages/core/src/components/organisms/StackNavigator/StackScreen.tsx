import React, { type ReactNode, useMemo, useEffect, useRef } from 'react';
import { useStackNavigator } from '../StackNavigator/StackNavigator';

export interface StackScreenProps {
  screenId: string;
  children: ReactNode;
  onShown?: () => void;
  onHidden?: () => void;
  className?: string;
  scrollable?: boolean;
}

export const StackScreen: React.FC<StackScreenProps> = ({
  screenId,
  children,
  className = '',
  onShown,
  onHidden,
  scrollable = true,
}) => {
  const { currentScreen, screenStack, animatingScreens, pendingScreen } =
    useStackNavigator();

  // Track previous visibility state to detect transitions
  const wasVisibleRef = useRef(false);

  // Memoize calculations to avoid recalculating on every render
  const screenState = useMemo(() => {
    const stackIndex = screenStack.indexOf(screenId);
    const currentIndex = screenStack.indexOf(currentScreen);
    const isAnimating = animatingScreens.includes(screenId);
    const isPending = pendingScreen === screenId;
    const isCurrentScreen = currentScreen === screenId;

    // Don't render if not in stack and not animating
    if (stackIndex === -1 && !isAnimating) {
      return { shouldRender: false, isVisible: false };
    }

    // Calculate transform once
    let transform = 'translateX(0%)';

    if (isAnimating) {
      transform = 'translateX(100%)'; // Slide out right
    } else if (isPending) {
      transform = 'translateX(100%)'; // Start off-screen right
    } else if (stackIndex < currentIndex) {
      transform = 'translateX(-100%)'; // Behind current - left
    } else if (stackIndex > currentIndex) {
      transform = 'translateX(100%)'; // Ahead of current - right
    }

    return {
      shouldRender: true,
      isVisible: isCurrentScreen && !isPending && !isAnimating,
      transform,
      zIndex: (stackIndex !== -1 ? stackIndex : 999) + 1,
    };
  }, [screenId, currentScreen, screenStack, animatingScreens, pendingScreen]);

  // Detect visibility changes and call callbacks
  useEffect(() => {
    const isVisible = screenState.shouldRender && screenState.isVisible;
    const wasVisible = wasVisibleRef.current;

    if (isVisible && !wasVisible) {
      // Screen became visible
      onShown?.();
    } else if (!isVisible && wasVisible) {
      // Screen became hidden
      onHidden?.();
    }

    wasVisibleRef.current = isVisible;
  }, [screenState.isVisible, screenState.shouldRender, onShown, onHidden]);

  if (!screenState.shouldRender) {
    return null;
  }

  // Determine overflow classes based on scrollable prop
  const overflowClasses = scrollable
    ? 'overflow-y-auto overflow-x-hidden'
    : 'overflow-hidden';

  return (
    <div
      data-screen-id={screenId}
      className={`absolute inset-0 transition-transform duration-300 ease-out ${className}`}
      style={{
        zIndex: screenState.zIndex,
        transform: screenState.transform,
        willChange: 'transform', // Optimize for animations
      }}
    >
      <div className={`h-full w-full ${overflowClasses}`}>{children}</div>
    </div>
  );
};
