import { type PropsWithChildren } from 'react';

export type MobileBottomNavBarProps = PropsWithChildren<{
  className?: string;
}>;

export type MobileBottomNavItemProps = PropsWithChildren<{
  as?: React.ElementType;
  label: string;
  icon?: React.ElementType;
  href?: string;
  onClick?: () => void;
  className?: string;
}>;