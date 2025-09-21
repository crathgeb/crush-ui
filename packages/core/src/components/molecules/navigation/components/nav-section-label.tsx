import React from 'react';
import { cn } from '@/utils';
import type { NavSectionLabelProps } from '../navigation.types';

export const NavSectionLabel = React.forwardRef<
  HTMLDivElement,
  NavSectionLabelProps
>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('nav-section-label', className)} {...props}>
      {children}
    </div>
  );
});

NavSectionLabel.displayName = 'NavSectionLabel';