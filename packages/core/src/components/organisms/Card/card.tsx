import * as React from 'react';

import { cn } from '@/utils';
import type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardActionProps,
  CardContentProps,
  CardFooterProps,
} from './card.types';

function Card({ className, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn('card', className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn('card-header', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn('card-title', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      data-slot="card-description"
      className={cn('card-description', className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: CardActionProps) {
  return (
    <div
      data-slot="card-action"
      className={cn('card-action', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn('card-content', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: CardFooterProps) {
  return (
    <div
      data-slot="card-footer"
      className={cn('card-footer', className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};