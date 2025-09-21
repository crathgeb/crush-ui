import React, { type ReactNode } from "react";
import { DragHandle } from "../../../molecules/drag-handle";
import { useDrawerAnimator } from "../hooks/useDrawerAnimator";
import { useGlobalDragGestures } from "../hooks/useGlobalDragGestures";
import type {
  DrawerPosition,
  MagicDrawerContentProps,
} from "../magic-drawer.types";
import { cn } from "../../../../utils/cn";

export const MagicDrawerContent: React.FC<MagicDrawerContentProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  height = 50,
  position = "bottom",
  sizeBreakpoints = [50],
  currentBreakpointIndex = 0,
  onBreakpointChange,
  allowDragAnywhere = true,
  shouldAutoJump = false,
}) => {
  // Calculate the current height based on the active breakpoint
  const currentHeight = sizeBreakpoints[currentBreakpointIndex] || height;
  // First, create the drawer animator without global state
  const {
    containerRef,
    containerClasses,
    transformClass,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    getDragTransform,
  } = useDrawerAnimator({
    isOpen,
    onClose,
    height: currentHeight,
    position,
    sizeBreakpoints,
    currentBreakpointIndex,
    onBreakpointChange,
    shouldAutoJump,
  });

  // Then, set up global gesture handling with the containerRef
  const { dragOffset: globalDragOffset, isDragging: isGlobalDragging } =
    useGlobalDragGestures({
      isVisible: isOpen,
      onClose,
      position,
      sizeBreakpoints,
      currentBreakpointIndex,
      onBreakpointChange,
      contentRef: containerRef,
      enabled: allowDragAnywhere,
      shouldAutoJump,
    });

  // Apply global drag effects directly to the container
  React.useEffect(() => {
    if (containerRef.current && isOpen && isGlobalDragging) {
      const container = containerRef.current;
      const isHorizontal = position === "left" || position === "right";

      // Remove transitions during global dragging
      container.style.transition = "none";

      if (isHorizontal) {
        let newWidth = (window.innerWidth * currentHeight) / 100;
        if (globalDragOffset < 0) {
          newWidth += Math.abs(globalDragOffset);
        } else if (globalDragOffset > 0) {
          newWidth = Math.max(0, newWidth - Math.abs(globalDragOffset));
        }
        container.style.width = `${newWidth}px`;
      } else {
        let newHeight = (window.innerHeight * currentHeight) / 100;
        if (globalDragOffset < 0) {
          newHeight += Math.abs(globalDragOffset);
        } else if (globalDragOffset > 0) {
          newHeight = Math.max(0, newHeight - Math.abs(globalDragOffset));
        }
        container.style.height = `${newHeight}px`;
      }
    } else if (containerRef.current && !isGlobalDragging) {
      // Restore transitions when not dragging
      const container = containerRef.current;
      const isHorizontal = position === "left" || position === "right";
      container.style.transition = isHorizontal
        ? "width 300ms ease-out"
        : "height 300ms ease-out";
    }
  }, [isGlobalDragging, globalDragOffset, isOpen, currentHeight, position]);

  const dragTransform = getDragTransform();

  const renderDragHandle = () => {
    const getDirection = () => {
      switch (position) {
        case "bottom":
          return "up";
        case "top":
          return "down";
        case "left":
          return "right";
        case "right":
          return "left";
        default:
          return "up";
      }
    };

    return (
      <DragHandle
        direction={getDirection()}
        isDragging={isDragging}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      />
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn("ts-magic-drawer-backdrop", {
          "ts-magic-drawer-backdrop-open": isOpen,
          "ts-magic-drawer-backdrop-closed": !isOpen,
        })}
        style={{
          // Disable pointer events on backdrop entirely - let drawer handle its own events
          pointerEvents: "none",
        }}
        onClick={(e) => {
          // Only close if the click is on the backdrop itself, not on drawer content
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />

      {/* Backdrop click areas - only in areas not covered by drawer */}
      {isOpen && (
        <>
          {position === "bottom" && (
            <div
              className="z-toast fixed top-0 right-0 left-0"
              style={{ bottom: `${currentHeight}%` }}
              onClick={onClose}
            />
          )}
          {position === "top" && (
            <div
              className="z-toast fixed right-0 bottom-0 left-0"
              style={{ top: `${currentHeight}%` }}
              onClick={onClose}
            />
          )}
          {position === "left" && (
            <div
              className="z-toast fixed top-0 right-0 bottom-0"
              style={{ left: `${currentHeight}%` }}
              onClick={onClose}
            />
          )}
          {position === "right" && (
            <div
              className="z-toast fixed top-0 bottom-0 left-0"
              style={{ right: `${currentHeight}%` }}
              onClick={onClose}
            />
          )}
        </>
      )}

      {/* Drawer Container */}
      <div
        className={cn(
          "ts-magic-drawer-container",
          position === "left" && "ts-magic-drawer-container-left",
          position === "right" && "ts-magic-drawer-container-right",
          containerClasses,
          transformClass,
          className
        )}
        style={{
          // Apply all drag transforms to the outer container
          ...dragTransform,
          transition:
            isDragging || isGlobalDragging ? "none" : "all 300ms ease-out",
        }}
      >
        {/* Draggable Handle - position it appropriately */}
        {(position === "bottom" || position === "right") && renderDragHandle()}

        {/* Content Container - Dynamic size management */}
        <div ref={containerRef} className="ts-magic-drawer-content">
          {children}
        </div>

        {(position === "left" || position === "top") && renderDragHandle()}
      </div>
    </>
  );
};
