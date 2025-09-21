# Complete Storybook Story Creation Guide

## Overview

This guide provides exact instructions for creating Storybook stories that follow the techsnack-ui design system standards. Follow this template precisely to ensure consistent documentation and functionality.

## Required Story Structure

Every Storybook story MUST contain exactly these elements in this order:

1. **Component Description** - In meta.parameters.docs.description.component
2. **Table of Contents** - In the component description (not as separate story)
3. **Component Usage Guidelines** - In the component description (not as separate story)
4. **Developer Notes** - In the component description (not as separate story)
5. **Default Story** - Primary interactive example
6. **Additional Stories** - Comprehensive examples with code samples

## Exact File Template

````typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentName } from '@crush-ui/core';

const meta: Meta<typeof ComponentName> = {
  title: 'Category/ComponentName', // Use: _base, Atoms, Molecules, Organisms, Templates
  component: ComponentName,
  parameters: {
    layout: 'centered', // or 'padded', 'fullscreen' based on component needs
    docs: {
      description: {
        component:
          'COMPONENT_DESCRIPTION_HERE\n\n## Table of Contents\n\n[Component Usage Guidelines](#component-usage-guidelines)  \n[Developer Notes](#developer-notes)  \n[Stories](#stories)  \n&nbsp;&nbsp;&nbsp;&nbsp;[Default](#story--CATEGORY-COMPONENT--default)  \n&nbsp;&nbsp;&nbsp;&nbsp;[StoryName2](#story--CATEGORY-COMPONENT--story-name-2)  \n&nbsp;&nbsp;&nbsp;&nbsp;[StoryName3](#story--CATEGORY-COMPONENT--story-name-3)  \n\n## Component Usage Guidelines\n\n**When to use:**\n- USAGE_POINT_1\n- USAGE_POINT_2\n- USAGE_POINT_3\n\n**When not to use:**\n- ALTERNATIVE_POINT_1\n- ALTERNATIVE_POINT_2\n- ALTERNATIVE_POINT_3\n\n## Developer Notes\n\n- TECHNICAL_NOTE_1\n- TECHNICAL_NOTE_2\n- TECHNICAL_NOTE_3\n- TECHNICAL_NOTE_4',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for interactive props only
    propName: {
      control: { type: 'text' }, // or 'select', 'boolean', etc.
      description: 'Description of this prop',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Component wrapper functions (NOT inline renders)
const DefaultComponent = () => (
  // Component implementation
);

export const Default: Story = {
  render: () => <DefaultComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Story description here.\n\n```tsx\n// Exact code sample\n```',
      },
    },
  },
};

// Additional stories follow same pattern...
````

## Critical Requirements

### 1. Component Description Format

- 1-2 sentences describing the component
- Must be in `meta.parameters.docs.description.component`
- Include the full documentation structure (TOC, guidelines, notes)

### 2. Table of Contents Format

```
## Table of Contents

[Component Usage Guidelines](#component-usage-guidelines)
[Developer Notes](#developer-notes)
[Stories](#stories)
&nbsp;&nbsp;&nbsp;&nbsp;[Default](#story--CATEGORY-COMPONENT--default)
&nbsp;&nbsp;&nbsp;&nbsp;[StoryName](#story--CATEGORY-COMPONENT--story-name)
```

**CRITICAL:**

- NO bullet points (no `-` or `*`)
- Use `&nbsp;&nbsp;&nbsp;&nbsp;` for indentation
- Links MUST use format: `#story--category-component--story-name` (lowercase, hyphens)
- Two spaces at end of each line for line breaks
- "Stories" is top-level, individual stories are indented

### 3. Usage Guidelines Format

```
## Component Usage Guidelines

**When to use:**
- Point 1
- Point 2
- Point 3

**When not to use:**
- Point 1
- Point 2
- Point 3
```

### 4. Developer Notes Format

```
## Developer Notes

- Technical point 1
- Technical point 2
- Technical point 3
- Technical point 4
```

### 5. Story Implementation Rules

#### Component Functions

- NEVER use inline renders: `render: () => <Component />`
- ALWAYS create wrapper functions: `const ComponentName = () => (...)`
- Use descriptive function names ending with "Component"

#### Story Documentation

Every story MUST include:

````typescript
parameters: {
  docs: {
    description: {
      story: 'Description of what this story demonstrates.\n\n```tsx\n// Exact code implementation\n```',
    },
  },
},
````

#### Code Samples

- Include complete, copy-pasteable code
- Use proper indentation and formatting
- Show realistic, meaningful examples
- Include all necessary imports and props

### 6. File Organization

Place stories in the correct directory:

- `packages/core/src/components/_base/*` → `packages/storybook/src/stories/_base/component-name.stories.tsx`
- `packages/core/src/components/atoms/` → `packages/storybook/src/stories/atoms/component-name.stories.tsx`
- `packages/core/src/components/molecules/` → `packages/storybook/src/stories/Molecules/component-name.stories.tsx`
- `packages/core/src/components/organisms/` → `packages/storybook/src/stories/organisms/component-name.stories.tsx`
- `packages/core/src/components/templates/` → `packages/storybook/src/stories/templates/component-name.stories.tsx`

### 7. Required Stories

Every component should have:

- **Default** - Primary usage example with all major props
- **Simple** - Minimal implementation (if applicable)
- **Complex** - Advanced/real-world usage (if applicable)
- **Playground** - Interactive controls story
- **Variants** - Different visual styles (if applicable)

### 8. ArgTypes Configuration

Only include controls for props that:

- Are commonly modified by users
- Demonstrate component functionality
- Have meaningful visual impact

```typescript
argTypes: {
  variant: {
    control: { type: 'select' },
    options: ['default', 'secondary', 'outline'],
    description: 'Visual style variant',
  },
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
    description: 'Component size',
  },
  disabled: {
    control: { type: 'boolean' },
    description: 'Whether the component is disabled',
  },
  children: {
    control: { type: 'text' },
    description: 'Content to display',
  },
  className: {
    control: { type: 'text' },
    description: 'Additional CSS classes',
  },
},
```

## Common Mistakes to Avoid

1. **DON'T** create separate stories for documentation sections
2. **DON'T** use markdown syntax in TypeScript code
3. **DON'T** use bullet points in table of contents
4. **DON'T** inline component renders in story objects
5. **DON'T** forget code samples in story descriptions
6. **DON'T** use incorrect anchor link formats
7. **DON'T** mix documentation content with story content

## Example Link Formats

For a component at `Organisms/Card`:

- `#story--organisms-card--default`
- `#story--organisms-card--simple`
- `#story--organisms-card--complex`
- `#story--organisms-card--header-variations`

Pattern: `#story--[category]--[component]--[story-name]`

- All lowercase
- Replace spaces/special chars with hyphens
- Category and component names from meta.title

## Quality Checklist

Before submitting, verify:

- [ ] Component description is 1-2 sentences
- [ ] Table of contents has proper formatting and working links
- [ ] Usage guidelines have "When to use" and "When not to use"
- [ ] Developer notes are 3-4 concise technical points
- [ ] All stories have wrapper functions (not inline renders)
- [ ] All stories have descriptions with code samples
- [ ] Code samples are complete and copy-pasteable
- [ ] ArgTypes only include necessary interactive controls
- [ ] File is placed in correct directory
- [ ] No syntax errors or duplicate identifiers

This template ensures consistent, high-quality Storybook documentation across all techsnack-ui components.
