# IconButton Component

A versatile icon-only button component with multiple variants for size, styling, and corner rounding. Built with CVA (Class Variance Authority) for type-safe variant management and consistent styling.

## Props

| Prop        | Type                                                           | Default     | Description                                   |
| ----------- | -------------------------------------------------------------- | ----------- | --------------------------------------------- |
| `icon`      | `React.ReactElement`                                           | Required    | The icon element to display inside the button |
| `size`      | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Size variant of the button                    |
| `rounded`   | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`                     | `'md'`      | Corner rounding variant                       |
| `variant`   | `'primary' \| 'secondary' \| 'danger' \| 'ghost' \| 'surface'` | `'primary'` | Color and style variant                       |
| `disabled`  | `boolean`                                                      | `false`     | Whether the button is disabled                |
| `className` | `string`                                                       | `undefined` | Additional CSS classes to apply               |

All standard HTML button attributes are also supported (onClick, type, form, aria-label, etc.).

## Usage

### Basic Usage

```tsx
import { IconButton } from '@/components/molecules/IconButton';
import { Home } from 'lucide-react';

// Simple icon button
<IconButton icon={<Home />} onClick={() => console.log('clicked')} />;
```

### Size Variants

```tsx
import { IconButton } from '@/components/molecules/IconButton';
import { Settings } from 'lucide-react';

// Small button
<IconButton icon={<Settings />} size="sm" />

// Medium button (default)
<IconButton icon={<Settings />} size="md" />

// Large button
<IconButton icon={<Settings />} size="lg" />
```

### Rounded Corner Variants

```tsx
import { IconButton } from '@/components/molecules/IconButton';
import { Edit } from 'lucide-react';

// No rounding
<IconButton icon={<Edit />} rounded="none" />

// Small rounding
<IconButton icon={<Edit />} rounded="sm" />

// Medium rounding (default)
<IconButton icon={<Edit />} rounded="md" />

// Large rounding
<IconButton icon={<Edit />} rounded="lg" />

// Fully rounded (circular)
<IconButton icon={<Edit />} rounded="full" />
```

### Color Variants

```tsx
import { IconButton } from '@/components/molecules/IconButton';
import { Save, Cancel, Trash, Menu, Info } from 'lucide-react';

// Primary button (default)
<IconButton icon={<Save />} variant="primary" />

// Secondary button
<IconButton icon={<Info />} variant="secondary" />

// Danger button
<IconButton icon={<Trash />} variant="danger" />

// Ghost button (transparent background)
<IconButton icon={<Menu />} variant="ghost" />

// Surface button (menu-style)
<IconButton icon={<Cancel />} variant="surface" />
```

### Disabled State

```tsx
import { IconButton } from '@/components/molecules/IconButton';
import { Download } from 'lucide-react';

// Disabled button
<IconButton icon={<Download />} disabled />;
```

### Combined Variants

```tsx
import { IconButton } from '@/components/molecules/IconButton';
import { Trash, Plus, Settings } from 'lucide-react';

// Small, circular, danger button
<IconButton
  icon={<Trash />}
  variant="danger"
  size="sm"
  rounded="full"
  onClick={handleDelete}
/>

// Large, ghost button with custom styling
<IconButton
  icon={<Plus />}
  variant="ghost"
  size="lg"
  rounded="lg"
  className="border-2 border-dashed"
/>

// Surface variant with medium rounding
<IconButton
  icon={<Settings />}
  variant="surface"
  rounded="md"
  aria-label="Open settings"
/>
```

### With Form Integration

```tsx
import { IconButton } from '@/components/molecules/IconButton';
import { Save } from 'lucide-react';

// Submit button for a form
<IconButton
  icon={<Save />}
  type="submit"
  form="myForm"
  variant="primary"
  aria-label="Save document"
/>;
```

### With Ref

```tsx
import { IconButton } from '@/components/molecules/IconButton';
import { Focus } from 'lucide-react';
import { useRef } from 'react';

function MyComponent() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <IconButton
      ref={buttonRef}
      icon={<Focus />}
      onClick={() => buttonRef.current?.focus()}
    />
  );
}
```

## Styling

The component uses CVA for variant management with the following base classes:

- **Base**: `cursor-pointer inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`

### Size Classes

- **Small**: `p-1.5 text-sm`
- **Medium**: `p-2 text-base`
- **Large**: `p-3 text-lg`

### Rounded Classes

- **None**: `rounded-none`
- **Small**: `rounded-[.5rem]`
- **Medium**: `rounded-[.75rem]`
- **Large**: `rounded-[1rem]`
- **Full**: `rounded-full`

### Variant Classes

- **Primary**: Primary brand colors with hover/active states
- **Secondary**: Secondary colors with hover/active states
- **Danger**: Destructive colors for dangerous actions
- **Ghost**: Transparent background with subtle hover effects
- **Surface**: Menu-style background with hover transitions

## Common Use Cases

1. **Toolbar Actions**: Save, edit, delete, and other quick actions
2. **Navigation**: Menu toggles, back buttons, close buttons
3. **Form Controls**: Submit buttons, clear buttons, add/remove items
4. **Media Controls**: Play, pause, next, previous buttons
5. **Settings**: Configuration and preference toggles
6. **Social Actions**: Like, share, bookmark buttons

## Accessibility

- Always provide an `aria-label` for screen readers since the button contains only an icon
- The component includes proper focus management with visible focus rings
- Disabled state is properly communicated to assistive technologies
- Maintains adequate color contrast for all variants

```tsx
// Good accessibility practices
<IconButton
  icon={<Trash />}
  variant="danger"
  aria-label="Delete item"
  onClick={handleDelete}
/>

<IconButton
  icon={<Menu />}
  variant="ghost"
  aria-label="Open navigation menu"
  aria-expanded={isMenuOpen}
  onClick={toggleMenu}
/>
```

## Examples in Context

### Toolbar

```tsx
<div className="flex items-center gap-2 rounded-lg border p-2">
  <IconButton icon={<Bold />} variant="ghost" aria-label="Bold" />
  <IconButton icon={<Italic />} variant="ghost" aria-label="Italic" />
  <IconButton icon={<Underline />} variant="ghost" aria-label="Underline" />
  <div className="bg-border h-6 w-px" />
  <IconButton icon={<AlignLeft />} variant="ghost" aria-label="Align left" />
  <IconButton
    icon={<AlignCenter />}
    variant="ghost"
    aria-label="Align center"
  />
  <IconButton icon={<AlignRight />} variant="ghost" aria-label="Align right" />
</div>
```

### Card Actions

```tsx
<div className="rounded-lg border p-4">
  <div className="flex items-start justify-between">
    <div>
      <h3 className="font-semibold">Document Title</h3>
      <p className="text-muted-foreground text-sm">Last edited 2 hours ago</p>
    </div>
    <div className="flex gap-1">
      <IconButton
        icon={<Edit />}
        variant="ghost"
        size="sm"
        aria-label="Edit document"
      />
      <IconButton
        icon={<Share />}
        variant="ghost"
        size="sm"
        aria-label="Share document"
      />
      <IconButton
        icon={<Trash />}
        variant="ghost"
        size="sm"
        aria-label="Delete document"
      />
    </div>
  </div>
</div>
```

### Floating Action Button

```tsx
<IconButton
  icon={<Plus />}
  variant="primary"
  size="lg"
  rounded="full"
  className="fixed right-6 bottom-6 shadow-lg"
  aria-label="Add new item"
  onClick={handleAdd}
/>
```
