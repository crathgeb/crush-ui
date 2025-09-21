# crush-ui

A modern UI component library built with React and TypeScript, with integrated Storybook for development and testing.

## Project Structure

This is a monorepo containing:

- `packages/core/` - The main UI component library (published to npm as `@crush-ui/core`)
- `packages/presets/` - Design presets and themes (published to npm as `@crush-ui/presets`)
- `packages/storybook/` - Storybook for component development and testing

## Installation

```bash
# Install the core component library
npm install @crush-ui/core

# Install presets for themes and styling
npm install @crush-ui/presets
```

## Usage

### Basic Usage

```jsx
import { Button } from '@crush-ui/core';

function App() {
  return (
    <Button onClick={() => console.log('clicked')}>
      Click me
    </Button>
  );
}
```

### Using Presets

```jsx
import { Button } from '@crush-ui/core';
import { buttonPresets, lightTheme } from '@crush-ui/presets';

function App() {
  return (
    <Button
      {...buttonPresets.hero.defaultProps}
      onClick={() => console.log('clicked')}
    >
      Hero Button
    </Button>
  );
}
```

## Development

```bash
# Install all dependencies
npm install

# Build all packages
npm run build

# Build individual packages
npm run build:core
npm run build:presets

# Start Storybook for development
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

## Publishing

```bash
# Build and publish individual packages
npm run publish:core
npm run publish:presets

# Build and publish all packages
npm run publish:all
```

## Scripts

- `npm run build` - Build all packages
- `npm run build:core` - Build the core component library
- `npm run build:presets` - Build the presets package
- `npm run dev:core` - Watch mode for core library development
- `npm run dev:presets` - Watch mode for presets development
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production
- `npm run clean` - Clean all build artifacts

## License

MIT