import React, { type RefObject, type PropsWithChildren } from 'react';

export interface MenuItem {
  as: React.ElementType;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  submenu?: DropdownData;
  className?: string;
}

export interface DropdownData {
  sections: {
    label: string;
    items: MenuItem[];
  }[];
}

export interface DropdownMenuProps {
  data: DropdownData;
  dropdownRef: RefObject<HTMLDivElement | null>;
  className?: string;
  triggerClassName?: string;
}