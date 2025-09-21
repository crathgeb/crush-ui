import React from 'react';
import { cn } from '../../../utils/cn';
import type { DragHandleProps } from './drag-handle.types';

export const DragHandle: React.FC<DragHandleProps> = ({
  isDragging,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onMouseDown,
  direction = 'up',
}) => {
  return (
    <div
      className={cn('ts-drag-handle-container', {
        'ts-drag-handle-container-up': direction === 'up',
        'ts-drag-handle-container-down': direction === 'down',
        'ts-drag-handle-container-left': direction === 'left',
        'ts-drag-handle-container-right': direction === 'right',
      })}
    >
      <div
        className={cn(
          'ts-drag-handle-handle',
          {
            'ts-drag-handle-handle-up': direction === 'up',
            'ts-drag-handle-handle-down': direction === 'down',
            'ts-drag-handle-handle-left': direction === 'left',
            'ts-drag-handle-handle-right': direction === 'right',
          },
          isDragging ? 'ts-drag-handle-dragging' : ''
        )}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <div
          className={cn(
            'ts-drag-handle-dash-mark',
            (direction === 'left' || direction === 'right') &&
              'ts-drag-handle-dash-mark-vertical'
          )}
        ></div>
      </div>
    </div>
  );
};