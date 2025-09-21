import React, { type ReactNode, cloneElement } from 'react';
import { isValidElement } from 'react';
import { cn } from '../../../../utils/cn';
import type { MagicDrawerTriggerProps } from '../magic-drawer.types';

export const MagicDrawerTrigger: React.FC<MagicDrawerTriggerProps> = ({
  children,
  drawerId = 'magic-drawer',
  action = 'toggle',
  className = '',
  asChild = false,
}) => {
  const triggerProps = {
    'data-magic-drawer-trigger': drawerId,
    'data-magic-drawer-action': action,
  };

  if (asChild) {
    if (!isValidElement(children)) {
      throw new Error(
        'MagicDrawerTrigger with asChild requires a single React element as child'
      );
    }

    return cloneElement(children as React.ReactElement<any>, {
      ...triggerProps,
      className: cn(
        (children as React.ReactElement<any>).props.className,
        className
      ),
    });
  }

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none active:bg-gray-900 disabled:opacity-25',
        className
      )}
      {...triggerProps}
    >
      {children}
    </button>
  );
};

// Convenience components for specific actions
export const MagicDrawerOpenTrigger: React.FC<
  Omit<MagicDrawerTriggerProps, 'action'>
> = (props) => <MagicDrawerTrigger {...props} action="open" />;

export const MagicDrawerCloseTrigger: React.FC<
  Omit<MagicDrawerTriggerProps, 'action'>
> = (props) => <MagicDrawerTrigger {...props} action="close" />;

export const MagicDrawerToggleTrigger: React.FC<
  Omit<MagicDrawerTriggerProps, 'action'>
> = (props) => <MagicDrawerTrigger {...props} action="toggle" />;
