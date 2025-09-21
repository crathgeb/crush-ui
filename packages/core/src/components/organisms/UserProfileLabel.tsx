import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const UserProfileLabelVariants = cva('rounded-btn flex items-center p-2', {
  variants: {
    variant: {
      default: 'space-x-4',
      compact: 'space-x-3',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const nameVariants = cva('surface2-foreground truncate', {
  variants: {
    variant: {
      default: 'text-lg font-semibold leading-6',
      compact: 'text-sm font-medium',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const emailVariants = cva('text-muted-foreground truncate', {
  variants: {
    variant: {
      default: 'text-sm',
      compact: 'text-xs',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const photoVariants = cva('rounded-full object-cover', {
  variants: {
    variant: {
      default: 'h-12 w-12',
      compact: 'h-8 w-8',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const fallbackVariants = cva(
  'bg-secondary flex items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        default: 'h-12 w-12',
        compact: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface UserProfileLabelProps
  extends VariantProps<typeof UserProfileLabelVariants> {
  name: string;
  email: string;
  profilePhotoUrl?: string;
  className?: string;
}

export const UserProfileLabel = ({
  name,
  variant = 'default',
  email,
  profilePhotoUrl,
  className,
}: UserProfileLabelProps) => {
  return (
    <div className={cn(UserProfileLabelVariants({ variant, className }))}>
      {profilePhotoUrl ? (
        <img
          className={photoVariants({ variant })}
          src={profilePhotoUrl}
          alt={name}
        />
      ) : (
        <div className={fallbackVariants({ variant })}>
          <span className="text-secondary-foreground text-sm font-medium">
            {name?.charAt(0)}
          </span>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className={nameVariants({ variant })}>{name}</p>
        <p className={emailVariants({ variant })}>{email}</p>
      </div>
    </div>
  );
};
