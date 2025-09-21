import React from 'react';

type NavHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export const NavHeader = React.forwardRef<HTMLDivElement, NavHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <div ref={ref} className={`nav-header ${className || ''}`}>
        <div className="nav-header-content">{children}</div>
      </div>
    );
  }
);

NavHeader.displayName = 'NavHeader';
