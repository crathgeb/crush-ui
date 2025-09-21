import React from 'react';

export interface DragHandleProps {
  isDragging: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  direction?: 'up' | 'down' | 'left' | 'right';
}