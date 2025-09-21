import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const navItemVariants = cva('nav-item', {
  variants: {
    variant: {
      default: 'nav-item-default',
      active: 'nav-item-active',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface NavItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navItemVariants> {
  asChild?: boolean;
}

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
        ...props, // NavItem props first
        ...childProps, // Child props override NavItem props
        className: mergedClassName, // Manually merge classNames
        ref: ref, // Forward ref
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
