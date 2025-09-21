import React from 'react';
import { cn } from '@/utils';
import type { NavHeaderProps } from '../navigation.types';

export const NavHeader = React.forwardRef<HTMLDivElement, NavHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('nav-header', className)} {...props}>
        <div className="nav-header-content">{children}</div>
      </div>
    );
  }
);

NavHeader.displayName = 'NavHeader';