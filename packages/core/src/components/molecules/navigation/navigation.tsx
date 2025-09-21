import React from 'react';
import type { NavigationProps } from './navigation.types';
import { cn } from '@/utils';

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <nav ref={ref} className={cn('navigation', className)} {...props}>
        {children}
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';