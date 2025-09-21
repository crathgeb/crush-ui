import React from 'react';
import { cn } from '@/utils';

interface NavDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const NavDivider = React.forwardRef<HTMLDivElement, NavDividerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('nav-divider', className)} {...props} />
    );
  }
);

NavDivider.displayName = 'NavDivider';
