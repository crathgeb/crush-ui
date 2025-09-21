import { cn } from '@/utils/cn';
import { CircleQuestionMarkIcon } from 'lucide-react';
import { forwardRef, type PropsWithChildren } from 'react';

export type MobileBottomNavBarProps = PropsWithChildren<{
  className?: string;
}>;

export const MobileBottomNavBar = forwardRef<
  HTMLDivElement,
  MobileBottomNavBarProps
>(({ children, className }, ref) => {
  return (
    <nav
      ref={ref}
      className={cn('ts-mobile-bottom-nav-bar', className)}
      aria-label="Mobile navigation"
    >
      {children}
    </nav>
  );
});

MobileBottomNavBar.displayName = 'MobileBottomNavBar';

export type MobileBottomNavItemProps = PropsWithChildren<{
  as?: React.ElementType;
  label: string;
  icon?: React.ElementType;
  href?: string;
  onClick?: () => void;
  className?: string;
}>;

export const MobileBottomNavItem = ({
  as,
  label,
  href,
  icon,
  className,
  onClick = () => {},
}: MobileBottomNavItemProps) => {
  const Component = as ?? 'button';
  const IconComponent = icon ?? CircleQuestionMarkIcon;

  return (
    <Component
      href={href ? href : undefined}
      onClick={onClick}
      className={cn('ts-mobile-bottom-nav-bar-item', className)}
    >
      {icon && <IconComponent className="ts-mobile-bottom-nav-bar-item-icon" />}
      <span className="ts-mobile-bottom-nav-bar-item-label">{label}</span>
    </Component>
  );
};
