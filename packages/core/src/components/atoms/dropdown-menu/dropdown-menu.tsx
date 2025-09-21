import React, { type PropsWithChildren, useState } from 'react';

import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuContent,
  DropdownMenuItem as DropdownMenuItemPrimitive,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
} from '@/components/_base';
import { cn } from '@/utils/cn';
import type { DropdownMenuProps, MenuItem } from './dropdown-menu.types';

const renderDropdownMenuItem = (key: string, item: MenuItem) => {
  const Component = item.as;
  return (
    <DropdownMenuItemPrimitive asChild={!!item.href} key={key}>
      <Component
        href={item.href ? item.href : undefined}
        onClick={item.onClick ? item.onClick : undefined}
        className={cn(item.className, 'ts-menu-item')}
      >
        <div className="flex items-center gap-2">
          {item.leftIcon && <span>{item.leftIcon}</span>}
          {item.label}
        </div>
        {item.rightIcon && <span className="ml-2">{item.rightIcon}</span>}
      </Component>
    </DropdownMenuItemPrimitive>
  );
};

const renderDropdownMenuItemSubmenu = (key: string, item: MenuItem) => {
  return (
    <DropdownMenuSub key={key}>
      <DropdownMenuSubTrigger className="ts-menu-trigger">
        {item.label}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="ts-submenu">
        {item.submenu?.sections?.map((subSection, sectionIndex) => (
          <DropdownMenuGroup key={`${subSection.label}-${sectionIndex}`}>
            {subSection.label && (
              <DropdownMenuLabel className="ts-menu-label">
                {subSection.label}
              </DropdownMenuLabel>
            )}
            {subSection.items?.map((subItem, index) =>
              renderDropdownMenuItem(
                `${subItem.label}-${subSection.label}-${index}`,
                subItem
              )
            )}
          </DropdownMenuGroup>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export const DropdownMenu = ({
  data,
  dropdownRef,
  children,
  className,
  triggerClassName,
}: PropsWithChildren<DropdownMenuProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div ref={dropdownRef} className={cn(className)}>
      <DropdownMenuPrimitive>
        <DropdownMenuTrigger asChild>
          <div
            className={cn('cursor-pointer', triggerClassName)}
            onClick={() => setIsOpen(!isOpen)}
          >
            {children}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="ts-menu"
          side="bottom"
          align="start"
          sideOffset={8}
          alignOffset={0}
        >
          {data.sections?.map((section, index) => (
            <DropdownMenuGroup key={section.label}>
              {index > 0 && <DropdownMenuSeparator />}
              {section.label && (
                <DropdownMenuLabel className="ts-menu-label">
                  {section.label}
                </DropdownMenuLabel>
              )}
              {section.items?.map((item) => {
                if (item.submenu) {
                  return renderDropdownMenuItemSubmenu(item.label, item);
                }
                return renderDropdownMenuItem(item.label, item);
              })}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPrimitive>
    </div>
  );
};