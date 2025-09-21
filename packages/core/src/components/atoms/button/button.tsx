import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/utils';
import type { ButtonProps } from './button.types';
import { ButtonVariants } from './button.types';

export { ButtonVariants };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(ButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}