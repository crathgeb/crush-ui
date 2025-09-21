# Component Folder Organization Pattern

This project follows **Atomic Design** methodology, organizing components into:

- **atoms/** - Basic building blocks (buttons, inputs, labels, icons)
- **molecules/** - Groups of atoms functioning together (form fields, search boxes, cards)
- **organisms/** - Complex UI components made of molecules/atoms (headers, navigation, forms, sidebars)
- **templates/** - Page-level layouts and wireframes that combine organisms
- **pages/** - Specific page implementations with real content

## Atomic Design Guidelines

**Atoms** should be:
- Single-purpose UI elements
- Highly reusable across the entire system
- Have minimal dependencies on other components

**Molecules** should be:
- Combinations of 2-5 atoms that work together
- Represent a single piece of functionality
- Be reusable in different contexts

**Organisms** should be:
- Complex components that form distinct sections of an interface
- May contain molecules, atoms, and other organisms
- Represent major UI sections or features

When creating React components at any atomic level, organize them as folders with this structure:

```
component-name/
├── index.ts                    # Public API exports
├── component-name.tsx          # Main component implementation
├── component-name.types.ts     # TypeScript interfaces and types
├── hooks/                      # Component-specific custom hooks
│   └── use-component-name.ts
└── components/                 # Sub-components used only by this component
    └── sub-component.tsx
```

## Naming Conventions:

- **Folder name**: kebab-case (e.g., `button`, `user-profile`)
- **Main component file**: kebab-case matching folder (e.g., `button.tsx`, `user-profile.tsx`)
- **Types file**: kebab-case with `.types.ts` suffix (e.g., `button.types.ts`)
- **Hook files**: kebab-case with `use-` prefix (e.g., `use-button-state.ts`)
- **Sub-components**: kebab-case (e.g., `button-icon.tsx`)

## File Contents:

- **index.ts**: Export the main component and its types for public consumption
- **component-name.tsx**: Main component implementation, import types from `.types.ts`
- **component-name.types.ts**: All TypeScript interfaces, types, and props definitions
- **hooks/**: Custom hooks specific to this component only
- **components/**: Sub-components that are only used within this component

## Export Patterns for Tree-Shaking

### 1. Component index.ts (Public API)

Each component's `index.ts` should explicitly export what consumers need:

```typescript
// component-name/index.ts
export { Button, ButtonVariants } from "./button";
export type { ButtonProps } from "./button.types";
```

### 2. Component Implementation (.tsx files)

Import types from the types file and export the main component:

```typescript
// component-name/component-name.tsx
import type { ButtonProps } from "./button.types";
import { ButtonVariants } from "./button.types";

export { ButtonVariants }; // Re-export from types if needed

export function Button({ variant, size, className, ...props }: ButtonProps) {
  // Component implementation
}
```

### 3. Types File (.types.ts)

Define and export all types, interfaces, and variant definitions:

```typescript
// component-name/component-name.types.ts
import { type VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const ButtonVariants = cva('btn', {
  variants: {
    variant: { default: 'btn-default', destructive: 'btn-destructive' },
    size: { default: 'btn-md', sm: 'btn-sm', lg: 'btn-lg' },
  },
});

export interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof ButtonVariants> {
  asChild?: boolean;
}
```

## Adding Components to the Export Chain

When creating a new component, add it to these files **in order** (replace `{level}` with the appropriate atomic design level: `atoms`, `molecules`, `organisms`, `templates`, or `pages`):

### 1. Component level barrel (`/src/components/{level}/index.ts`)

```typescript
export { NewComponent } from './new-component';
export type { NewComponentProps } from './new-component';
```

### 2. Main components barrel (`/src/components/index.ts`)

```typescript
// Direct import from source for optimal tree-shaking
export { NewComponent } from './{level}/new-component';
export type { NewComponentProps } from './{level}/new-component';
```

### 3. Types index (`/src/types/index.ts`)

```typescript
// Re-export component types
export type { NewComponentProps } from '../components/{level}/new-component';
```

### 4. Main package index (`/src/index.ts`)

```typescript
// Individual component exports for better tree-shaking
export { NewComponent } from './components/{level}/new-component';
// Types are exported via './types' wildcard
```

### Examples by Atomic Level:

**Atom (Button):**
```typescript
// atoms/index.ts
export { Button } from './button';
// components/index.ts
export { Button } from './atoms/button';
// types/index.ts
export type { ButtonProps } from '../components/atoms/button';
```

**Molecule (FormField):**
```typescript
// molecules/index.ts
export { FormField } from './form-field';
// components/index.ts
export { FormField } from './molecules/form-field';
// types/index.ts
export type { FormFieldProps } from '../components/molecules/form-field';
```

**Organism (Header):**
```typescript
// organisms/index.ts
export { Header } from './header';
// components/index.ts
export { Header } from './organisms/header';
// types/index.ts
export type { HeaderProps } from '../components/organisms/header';
```

## Tree-Shaking Best Practices

### ✅ DO: Use explicit exports
```typescript
export { Button, ButtonVariants } from './atoms/button';
export { FormField } from './molecules/form-field';
export { Header } from './organisms/header';
export type { ButtonProps } from './atoms/button';
```

### ❌ DON'T: Use wildcard exports in main entry points
```typescript
export * from './atoms'; // Can harm tree-shaking
export * from './molecules'; // Can harm tree-shaking
```

### ✅ DO: Import directly from component sources in barrel files
```typescript
export { Button } from './atoms/button'; // Direct path
export { FormField } from './molecules/form-field'; // Direct path
```

### ❌ DON'T: Chain through multiple barrel files
```typescript
export { Button } from './atoms'; // Goes through atoms/index.ts
export { FormField } from './molecules'; // Goes through molecules/index.ts
```

## Benefits

This pattern ensures:
- **Clean separation of concerns** - Types, implementation, and exports are in separate files
- **Predictable file locations** - Following kebab-case naming conventions
- **Clear public APIs** - Each component exports only what's needed
- **Optimal tree-shaking** - Direct imports allow bundlers to eliminate unused code
- **Better maintainability** - Types are separated from implementation
- **Consistent structure** - All components follow the same pattern
