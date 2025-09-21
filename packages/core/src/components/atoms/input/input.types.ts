import * as React from 'react';

export interface InputProps extends React.ComponentProps<'input'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  optional?: boolean;
  error?: string;
}