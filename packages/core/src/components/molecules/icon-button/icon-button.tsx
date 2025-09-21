import React from 'react';
import { cn } from '@/utils';
import type { IconButtonProps } from './icon-button.types';
import { sizeVariants, roundedVariants, colorVariants } from './icon-button.types';

export { sizeVariants, roundedVariants, colorVariants };

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      size = 'md',
      rounded = 'md',
      variant = 'primary',
      disabled = false,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = cn(
      'icon-btn',
      sizeVariants[size],
      roundedVariants[rounded],
      colorVariants[variant],
      className
    );

    return (
      <button ref={ref} disabled={disabled} className={classes} {...rest}>
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';