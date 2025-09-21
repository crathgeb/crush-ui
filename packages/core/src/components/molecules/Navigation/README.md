# Navigation Components

This directory contains navigation-related molecular components that provide structure and organization for navigation interfaces.

## Components

### NavHeader

A sticky header component for navigation areas with consistent styling and layout.

**Usage:**

```tsx
import { NavHeader } from '@/components/molecules/Navigation/NavHeader';

<NavHeader>
  <div className="nav-header-content">
    <h2>Navigation Title</h2>
  </div>
</NavHeader>;
```

**Features:**

- Sticky positioning at top of container
- Consistent border and background styling
- Built-in padding and spacing

### NavDivider

A simple horizontal divider component for separating navigation sections.

**Usage:**

```tsx
import { NavDivider } from '@/components/molecules/Navigation/NavDivider';

<NavDivider />

// With custom className
<NavDivider className="my-6" />
```

**Features:**

- Horizontal border with theme-aware colors
- Consistent vertical spacing (my-3)
- Extends all HTML div attributes
- Supports custom className via cn utility

**Props:**

- Extends `React.HTMLAttributes<HTMLDivElement>`
- `className?: string` - Additional CSS classes

### NavSectionLabel

A labeled section divider that combines a horizontal line with descriptive text, typically used to group navigation items.

**Usage:**

```tsx
import { NavSectionLabel } from '@/components/molecules/Navigation/NavSectionLabel';

<NavSectionLabel>
  Main Navigation
</NavSectionLabel>

<NavSectionLabel className="text-blue-500">
  Admin Tools
</NavSectionLabel>
```

**Features:**

- Horizontal divider with integrated text label
- Consistent typography (uppercase, small, semibold)
- Theme-aware muted foreground color
- Built-in horizontal padding (px-6) and vertical spacing (my-3, py-2)
- Supports custom className via cn utility

**Props:**

- Extends `React.HTMLAttributes<HTMLDivElement>`
- `children: React.ReactNode` - The label text or content
- `className?: string` - Additional CSS classes

### NavItem

A flexible navigation item component that supports both direct children and composition via the asChild pattern. Built with CVA for variant management.

**Usage:**

```tsx
import { NavItem } from '@/components/molecules/Navigation/NavItem';

// Basic usage
<NavItem onClick={() => console.log('clicked')}>
  Home
</NavItem>

// Active state
<NavItem variant="active">
  Current Page
</NavItem>

// With asChild for composition
<NavItem asChild>
  <a href="/dashboard">Dashboard</a>
</NavItem>

// With custom content
<NavItem variant="default">
  <div className="flex items-center gap-2">
    <HomeIcon size={16} />
    <span>Home</span>
  </div>
</NavItem>
```

**Features:**

- Two variants: `default` and `active` for different states
- Composition support via `asChild` prop
- Built-in hover effects and cursor pointer
- Consistent padding and spacing (px-6, py-3)
- Full width with flexible content alignment
- CVA-based variant management for type safety

**Props:**

- Extends `React.HTMLAttributes<HTMLDivElement>`
- `variant?: 'default' | 'active'` - Visual variant (default: 'default')
- `asChild?: boolean` - Render as child element instead of div (default: false)
- `className?: string` - Additional CSS classes

**Variants:**

- **default**: Standard navigation item with hover effects
- **active**: Highlighted state for current/selected items

## Styling

All navigation components use CSS classes defined in `src/styles/themes/default/components/navigation.css` and `src/styles/themes/default/components/nav-item.css`:

- `.nav-header` - Main header styling
- `.nav-header-content` - Content wrapper for header
- `.nav-divider` - Simple horizontal divider
- `.nav-section-label` - Section label with divider
- `.nav-item` - Base navigation item styling
- `.nav-item-default` - Default navigation item variant
- `.nav-item-active` - Active navigation item variant

## Design Patterns

### Semantic Structure

These components follow a semantic approach to navigation organization:

1. **NavHeader** - Top-level navigation container
2. **NavSectionLabel** - Section grouping with visual and textual separation
3. **NavItem** - Individual navigation elements with interactive states
4. **NavDivider** - Simple visual separation without labels

### Accessibility

- All components support standard HTML attributes including ARIA properties
- Semantic HTML structure with proper div elements
- Theme-aware colors that respect user preferences
- Proper focus management and keyboard navigation support

### Composition

These components are designed to be composed together:

```tsx
<nav>
  <NavHeader>
    <div className="nav-header-content">
      <h2>App Navigation</h2>
    </div>
  </NavHeader>

  <NavSectionLabel>Main Menu</NavSectionLabel>
  <NavItem variant="active">Dashboard</NavItem>
  <NavItem asChild>
    <a href="/projects">Projects</a>
  </NavItem>
  <NavItem>Settings</NavItem>

  <NavDivider />

  <NavSectionLabel>Account</NavSectionLabel>
  <NavItem>Profile</NavItem>
  <NavItem>Logout</NavItem>
</nav>
```
