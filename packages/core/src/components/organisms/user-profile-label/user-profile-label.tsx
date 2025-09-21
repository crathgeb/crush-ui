import { cn } from '@/utils';
import type { UserProfileLabelProps } from './user-profile-label.types';
import {
  UserProfileLabelVariants,
  nameVariants,
  emailVariants,
  photoVariants,
  fallbackVariants,
} from './user-profile-label.types';

export function UserProfileLabel({
  name,
  variant = 'default',
  email,
  profilePhotoUrl,
  className,
}: UserProfileLabelProps) {
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
}