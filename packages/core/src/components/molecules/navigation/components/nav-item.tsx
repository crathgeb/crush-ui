import React from 'react';
import { cn } from '@/utils';
import type { NavItemProps } from '../navigation.types';
import { navItemVariants } from '../navigation.types';

export const NavItem = React.forwardRef<HTMLDivElement, NavItemProps>(
  ({ asChild = false, variant, className, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as any;
      const mergedClassName = cn(
        navItemVariants({ variant }),
        className,
        childProps.className
      );

      return React.cloneElement(children, {
        ...props,
        ...childProps,
        className: mergedClassName,
        ref: ref,
      });
    }

    return (
      <div
        ref={ref}
        className={cn(navItemVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

NavItem.displayName = 'NavItem';