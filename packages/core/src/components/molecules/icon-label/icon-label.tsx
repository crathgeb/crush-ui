import React from 'react';
import type { IconLabelProps } from './icon-label.types';

export const IconLabel: React.FC<IconLabelProps> = ({
  icon,
  label,
  subLabel,
}) => {
  return (
    <div className="icon-menu-container">
      {icon}
      <div className="icon-menu-labels">
        <p className="icon-menu-label">{label}</p>
        {subLabel && <p className="icon-menu-sub-label">{subLabel}</p>}
      </div>
    </div>
  );
};