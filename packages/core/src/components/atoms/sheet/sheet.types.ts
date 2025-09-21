import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';

export interface SheetProps extends React.ComponentProps<typeof SheetPrimitive.Root> {}
export interface SheetTriggerProps extends React.ComponentProps<typeof SheetPrimitive.Trigger> {}
export interface SheetCloseProps extends React.ComponentProps<typeof SheetPrimitive.Close> {}
export interface SheetPortalProps extends React.ComponentProps<typeof SheetPrimitive.Portal> {}
export interface SheetOverlayProps extends React.ComponentProps<typeof SheetPrimitive.Overlay> {}
export interface SheetContentProps extends React.ComponentProps<typeof SheetPrimitive.Content> {
  side?: 'top' | 'right' | 'bottom' | 'left';
}
export interface SheetHeaderProps extends React.ComponentProps<'div'> {}
export interface SheetFooterProps extends React.ComponentProps<'div'> {}
export interface SheetTitleProps extends React.ComponentProps<typeof SheetPrimitive.Title> {}
export interface SheetDescriptionProps extends React.ComponentProps<typeof SheetPrimitive.Description> {}