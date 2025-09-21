# Component Folder Organization Pattern

When creating React components, organize them as folders with this structure:

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

## Example index.ts:

```typescript
export { Button } from "./button";
export type { ButtonProps } from "./button.types";
```

This pattern ensures clean separation of concerns, predictable file locations, and clear public APIs for components.
