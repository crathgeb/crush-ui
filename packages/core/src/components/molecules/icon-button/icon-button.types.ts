import React from 'react';

export const sizeVariants = {
  sm: 'icon-btn-sm',
  md: 'icon-btn-md',
  lg: 'icon-btn-lg',
} as const;

export const roundedVariants = {
  none: 'icon-btn-rounded-none',
  sm: 'icon-btn-rounded-sm',
  md: 'icon-btn-rounded-md',
  lg: 'icon-btn-rounded-lg',
  full: 'icon-btn-rounded-full',
} as const;

export const colorVariants = {
  primary: 'icon-btn-primary',
  secondary: 'icon-btn-secondary',
  danger: 'icon-btn-danger',
  ghost: 'icon-btn-ghost',
  surface: 'icon-btn-surface',
} as const;

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  icon: React.ReactElement;
  size?: keyof typeof sizeVariants;
  rounded?: keyof typeof roundedVariants;
  variant?: keyof typeof colorVariants;
  className?: string;
}