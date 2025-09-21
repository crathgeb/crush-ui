import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cva } from 'class-variance-authority';

export const ButtonVariants = cva('btn', {
  variants: {
    variant: {
      default: 'btn-default',
      destructive: 'btn-destructive',
      outline: 'btn-outline',
      secondary: 'btn-secondary',
      ghost: 'btn-ghost',
      link: 'btn-link',
    },
    size: {
      default: 'btn-md',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean;
}