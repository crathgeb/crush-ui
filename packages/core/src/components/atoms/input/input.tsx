import * as React from 'react';

import { cn } from '@/utils';
import type { InputProps } from './input.types';

export const Input = ({
  className,
  type,
  leftIcon,
  rightIcon,
  label,
  optional,
  error,
  ...props
}: InputProps) => {
  return (
    <div className="input-container">
      {label && (
        <label className="input-label">
          {label}
          {optional && <span className="input-optional">(optional)</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon &&
          React.isValidElement(leftIcon) &&
          React.cloneElement(leftIcon as React.ReactElement<any>, {
            ...(leftIcon.props as any),
            className: cn('input-icon-left', (leftIcon.props as any).className),
          })}
        {rightIcon &&
          React.isValidElement(rightIcon) &&
          React.cloneElement(rightIcon as React.ReactElement<any>, {
            ...(rightIcon.props as any),
            className: cn(
              'input-icon-right',
              (rightIcon.props as any).className
            ),
          })}
        <input
          type={type}
          data-slot="input"
          className={cn(
            'input-main',
            leftIcon && rightIcon && 'input-main-icon-both',
            leftIcon && 'input-main-icon-left',
            rightIcon && 'input-main-icon-right',
            !leftIcon && !rightIcon && 'input-main-no-icon',
            error && 'input-error-ring',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${props.id || 'input'}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p
          id={`${props.id || 'input'}-error`}
          className="input-error-label"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};