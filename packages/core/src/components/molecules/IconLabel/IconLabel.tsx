import React from 'react';

type IconLabelProps = {
  icon?: React.ReactElement;
  label?: React.ReactElement | string;
  subLabel?: React.ReactElement | string;
};

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
