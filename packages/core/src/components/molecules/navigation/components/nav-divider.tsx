import React from 'react';
import { cn } from '@/utils';
import type { NavDividerProps } from '../navigation.types';

export const NavDivider = React.forwardRef<HTMLDivElement, NavDividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('nav-divider', className)} {...props} />
    );
  }
);

NavDivider.displayName = 'NavDivider';