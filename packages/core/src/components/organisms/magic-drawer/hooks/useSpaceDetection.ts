import { useEffect, useState, useCallback } from 'react';
import type { DrawerPosition } from '../magic-drawer.types';

interface UseSpaceDetectionOptions {
  position: DrawerPosition;
  isOpen: boolean;
  enabled?: boolean;
}

interface SpaceDetectionResult {
  shouldAutoJump: boolean;
  availableSpace: number;
  availableSpaceRems: number;
}

/**
 * Hook to detect available space in the drawer's opening direction
 * and determine if the drawer should auto-jump to the largest breakpoint
 * when space is less than 500px (converted to rems)
 */
export const useSpaceDetection = ({
  position,
  isOpen,
  enabled = true,
}: UseSpaceDetectionOptions): SpaceDetectionResult => {
  const [result, setResult] = useState<SpaceDetectionResult>({
    shouldAutoJump: false,
    availableSpace: 0,
    availableSpaceRems: 0,
  });

  // Helper function to get root font size for rem conversion
  const getRootFontSize = useCallback((): number => {
    const rootElement = document.documentElement;
    const computedStyle = window.getComputedStyle(rootElement);
    const fontSize = computedStyle.fontSize;
    return parseFloat(fontSize) || 16; // Default to 16px if unable to get value
  }, []);

  // Helper function to convert pixels to rems
  const pxToRems = useCallback(
    (pixels: number): number => {
      const rootFontSize = getRootFontSize();
      return pixels / rootFontSize;
    },
    [getRootFontSize],
  );

  // Helper function to get available space based on drawer position
  const getAvailableSpace = useCallback((): number => {
    const { innerWidth, innerHeight } = window;

    switch (position) {
      case 'top':
      case 'bottom':
        return innerHeight;
      case 'left':
      case 'right':
        return innerWidth;
      default:
        return innerHeight;
    }
  }, [position]);

  // Calculate space and determine if auto-jump is needed
  const calculateSpaceDetection = useCallback((): SpaceDetectionResult => {
    if (!enabled) {
      return {
        shouldAutoJump: false,
        availableSpace: 0,
        availableSpaceRems: 0,
      };
    }

    const availableSpace = getAvailableSpace();
    const availableSpaceRems = pxToRems(availableSpace);
    const thresholdRems = pxToRems(500); // Convert 500px to rems

    const shouldAutoJump = availableSpaceRems < thresholdRems;

    return {
      shouldAutoJump,
      availableSpace,
      availableSpaceRems,
    };
  }, [enabled, getAvailableSpace, pxToRems]);

  // Update space detection when relevant factors change
  useEffect(() => {
    if (!enabled) return;

    const updateSpaceDetection = () => {
      const newResult = calculateSpaceDetection();
      setResult(newResult);
    };

    // Calculate immediately
    updateSpaceDetection();

    // Listen for window resize events
    const handleResize = () => {
      updateSpaceDetection();
    };

    window.addEventListener('resize', handleResize);

    // Also listen for orientation changes on mobile devices
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [enabled, calculateSpaceDetection]);

  // Also update when the drawer is opened
  useEffect(() => {
    if (isOpen && enabled) {
      const newResult = calculateSpaceDetection();
      setResult(newResult);
    }
  }, [isOpen, enabled, calculateSpaceDetection]);

  return result;
};
