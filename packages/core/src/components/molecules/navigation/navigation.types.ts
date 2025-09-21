import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

// Main Navigation Props
export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

// NavItem Variants
export const navItemVariants = cva('nav-item', {
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

// NavItem Props
export interface NavItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navItemVariants> {
  asChild?: boolean;
}

// NavHeader Props
export interface NavHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

// NavDivider Props
export interface NavDividerProps extends React.HTMLAttributes<HTMLDivElement> {}

// NavSectionLabel Props
export interface NavSectionLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}