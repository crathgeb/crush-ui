# IconLabel Component

A flexible React component that displays an icon alongside a label and optional sub-label text. Perfect for user profiles, menu items, or any interface element that needs an icon with descriptive text.

## Props

| Prop       | Type                           | Required | Description                                       |
| ---------- | ------------------------------ | -------- | ------------------------------------------------- |
| `icon`     | `React.ReactElement`           | No       | The icon element to display on the left side      |
| `label`    | `React.ReactElement \| string` | No       | The main text or element to display               |
| `subLabel` | `React.ReactElement \| string` | No       | Optional secondary text displayed below the label |

## Usage

### Basic Usage

```tsx
import { IconLabel } from '@/components/molecules/IconLabel';
import { User } from 'lucide-react';

// Simple text label with icon
<IconLabel icon={<User size={24} />} label="John Doe" />;
```

### With Sub-label

```tsx
import { IconLabel } from '@/components/molecules/IconLabel';
import { Mail } from 'lucide-react';

// Icon with main label and sub-label
<IconLabel
  icon={<Mail size={20} />}
  label="Email Settings"
  subLabel="Manage your email preferences"
/>;
```

### With React Elements

```tsx
import { IconLabel } from '@/components/molecules/IconLabel';
import { Badge } from '@/components/atoms/badge';
import { Settings } from 'lucide-react';

// Using React elements for labels
<IconLabel
  icon={<Settings size={20} />}
  label={<span className="font-bold">Advanced Settings</span>}
  subLabel={<Badge variant="secondary">Pro Feature</Badge>}
/>;
```

### Icon Only

```tsx
import { IconLabel } from '@/components/molecules/IconLabel';
import { Home } from 'lucide-react';

// Just an icon without text
<IconLabel icon={<Home size={24} />} />;
```

### Text Only

```tsx
import { IconLabel } from '@/components/molecules/IconLabel';

// Just text without an icon
<IconLabel label="Menu Item" subLabel="Description text" />;
```

## Styling

The component uses the following CSS classes for styling:

- **Container**: `flex flex-row items-center gap-4` - Horizontal layout with centered alignment and gap
- **Text Container**: `flex flex-col` - Vertical layout for label and sub-label
- **Main Label**: `surface2-foreground text-lg leading-6 font-semibold` - Primary text styling
- **Sub Label**: `text-muted-foreground text-sm` - Secondary text styling

## Common Use Cases

1. **User Profile Display**: Show user avatar with name and status
2. **Navigation Menu Items**: Display menu icons with labels and descriptions
3. **Settings Options**: Show setting icons with titles and descriptions
4. **Contact Lists**: Display contact information with appropriate icons
5. **Feature Lists**: Show feature icons with names and descriptions

## Accessibility

- The component maintains semantic structure with proper text hierarchy
- Icons should include appropriate `aria-label` attributes when used standalone
- Consider adding `role` attributes for complex interactive elements

## Examples in Context

### Navigation Menu

```tsx
<nav>
  <IconLabel
    icon={<Home size={20} />}
    label="Dashboard"
    subLabel="Overview and analytics"
  />
  <IconLabel
    icon={<Settings size={20} />}
    label="Settings"
    subLabel="Account preferences"
  />
</nav>
```

### User Profile Card

```tsx
<div className="rounded-lg border p-4">
  <IconLabel
    icon={<Avatar src="/user.jpg" />}
    label="Sarah Johnson"
    subLabel="Product Manager • Online"
  />
</div>
```
