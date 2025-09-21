# @crush-ux/presets

A Tailwind CSS preset package that maps runtime CSS variables to first-class Tailwind tokens. Provides comprehensive design system tokens for colors, spacing, border radius, and z-index.

## Features

- 🎨 **CSS Variable Integration**: Maps runtime CSS variables to Tailwind tokens
- 🔧 **Tailwind v4 Ready**: Built for Tailwind v4 with v3 compatibility
- 📦 **CSS Theme Export**: Includes complete CSS theme file with @theme syntax
- 🎯 **Design System Tokens**: Pre-configured colors, spacing, shadows, and more
- 🚀 **Production Ready**: ESM/CJS builds with TypeScript definitions

## Installation

```bash
npm install @crush-ux/presets
```

## Usage

### Method 1: Tailwind Preset (Recommended)

Add the preset to your `tailwind.config.js`:

```js
import crushPreset from '@crush-ux/presets';

export default {
  presets: [crushPreset],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  // Your additional config...
};
```

### Method 2: CSS Import

Import the CSS theme directly in your main CSS file:

```css
@import '@crush-ux/presets/theme.css';
```

### Method 3: CommonJS (Tailwind v3)

```js
module.exports = {
  presets: [require('@crush-ux/presets')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  // Your additional config...
};
```

## Available Tokens

### Colors
All colors map to CSS variables that you define in your project:

```css
/* Your CSS variables */
:root {
  --background: #ffffff;
  --foreground: #000000;
  --primary: #007bff;
  --secondary: #6c757d;
  --muted: #f8f9fa;
  --border: #dee2e6;
  /* ... and many more */
}
```

**Core Colors:**
- `background`, `foreground`
- `primary`, `secondary`, `muted`, `accent`
- `destructive`, `border`, `input`, `ring`
- `card`, `popover`

**Component Colors:**
- `sidebar-*` - Sidebar component colors
- `menu-*` - Menu component colors
- `nav-*` - Navigation component colors
- `chart-*` - Chart colors (1-5)

**Usage:**
```html
<div class="bg-background text-foreground border border-border">
  <button class="bg-primary text-primary-foreground">Click me</button>
</div>
```

### Border Radius
- Standard: `sm`, `md`, `lg`, `xl` (from CSS variables)
- Menu specific: `menu-sm`, `menu-md`, `menu-lg`
- Button specific: `btn-sm`, `btn-md`, `btn`

### Spacing
- `thin`, `sm`, `md`, `lg`, `xl` (all from CSS variables)

### Z-Index
- `base`, `nav`, `modal`, `overlay`, `toast` (all from CSS variables)

## Setting Up CSS Variables

Define your design tokens as CSS variables in your project:

```css
:root {
  /* Colors */
  --background: #ffffff;
  --foreground: #000000;
  --primary: #007bff;
  --primary-foreground: #ffffff;
  --secondary: #6c757d;
  --secondary-foreground: #ffffff;
  --muted: #f8f9fa;
  --muted-foreground: #6c757d;
  --border: #dee2e6;

  /* Border Radius */
  --border-radius: 0.5rem;
  --border-radius-sm: 0.25rem;
  --border-radius-md: 0.375rem;
  --border-radius-lg: 0.75rem;
  --border-radius-xl: 1rem;

  /* Spacing */
  --spacing-thin: 0.125rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Z-Index */
  --z-base: 0;
  --z-nav: 10;
  --z-modal: 50;
  --z-overlay: 100;
  --z-toast: 1000;
}

/* Dark mode */
.dark {
  --background: #000000;
  --foreground: #ffffff;
  --primary: #0d6efd;
  /* ... your dark theme values */
}
```

## Examples

### Basic Usage
```html
<div class="bg-background text-foreground border border-border rounded-lg p-md">
  <h2 class="text-primary font-bold">Welcome</h2>
  <p class="text-muted">This uses CSS variables for theming</p>
  <button class="bg-primary text-primary-foreground rounded-btn px-md py-sm">
    Get Started
  </button>
</div>
```

### With Alpha Values
```html
<div class="bg-primary/10 border border-primary/20 text-primary rounded-xl p-lg">
  <p>Subtle primary-colored container</p>
</div>
```

### Responsive Design
```html
<div class="bg-muted md:bg-primary lg:bg-secondary text-foreground">
  Responsive background colors
</div>
```

## Dark Mode Support

The preset works seamlessly with CSS variable-based dark mode:

```css
.dark {
  --background: #000000;
  --foreground: #ffffff;
  --primary: #3b82f6;
  /* ... other dark theme values */
}
```

```html
<div class="dark">
  <!-- All components automatically use dark theme values -->
  <div class="bg-background text-foreground">Dark mode content</div>
</div>
```

## TypeScript Support

Full TypeScript support with proper Config typing:

```ts
import crushPreset from '@crush-ux/presets';
import type { Config } from 'tailwindcss';

const config: Config = {
  presets: [crushPreset],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  // Your additional config...
};

export default config;
```

## Compatibility

- **Tailwind CSS**: `>=3.4 <5`
- **Node.js**: `>=16`
- **Browsers**: Modern browsers with CSS custom properties support

## License

MIT License - see LICENSE file for details.