# MagicDrawer Component

A flexible, animated drawer component with support for multiple breakpoints and global gesture handling.

## Features

- **Multi-breakpoint support**: Define multiple size breakpoints for different drawer states
- **Global gesture handling**: Drag from anywhere in the content area to resize the drawer
- **Smart interaction detection**: Automatically prevents gestures when interacting with buttons, inputs, and other interactive elements
- **Position flexibility**: Supports bottom, top, left, and right drawer positions
- **Intelligent space detection**: Automatically jumps to largest breakpoint when screen space is limited (<500px)
- **Smooth animations**: Fluid transitions between states with proper visual feedback
- **Accessibility**: Keyboard support (ESC to close) and proper ARIA attributes

## Basic Usage

```tsx
import { MagicDrawer } from './MagicDrawer';

function MyComponent() {
  return (
    <MagicDrawer
      id="my-drawer"
      sizeBreakpoints={[30, 60, 90]} // 30%, 60%, 90% of screen
      defaultOpen={false}
      position="bottom"
      allowDragAnywhere={true} // Enable dragging from content area
    >
      {({ isOpen, openDrawer, closeDrawer }) => (
        <div>
          <button onClick={openDrawer}>Open Drawer</button>
          {isOpen && (
            <div className="p-4">
              <h2>Drawer Content</h2>
              <p>Drag anywhere in this area to resize the drawer!</p>
              <button onClick={closeDrawer}>Close</button>
            </div>
          )}
        </div>
      )}
    </MagicDrawer>
  );
}
```

## Global Gestures

When `allowDragAnywhere={true}` is set, users can:

1. **Drag up from anywhere** in the content area to expand to the next breakpoint
2. **Drag down from anywhere** in the content area to collapse to the previous breakpoint or close
3. **Interactive elements are protected**: Buttons, inputs, links, and other interactive elements won't trigger drawer gestures

### Interactive Element Detection

The component automatically detects and avoids interfering with:

- HTML form elements: `<button>`, `<input>`, `<select>`, `<textarea>`, `<a>`
- Elements with interactive roles: `button`, `link`, `textbox`, `combobox`, `listbox`
- Elements with click handlers or `tabIndex >= 0`
- Elements with special data attributes: `data-interactive`, `data-magic-drawer-trigger`
- Elements with the `interactive` CSS class

### Custom Interactive Elements

To mark custom elements as interactive (preventing gesture handling):

```tsx
// Using data attribute
<div data-interactive onClick={handleClick}>Custom Button</div>

// Using CSS class
<div className="interactive" onClick={handleClick}>Custom Button</div>

// Using role attribute
<div role="button" onClick={handleClick}>Custom Button</div>
```

## Props

| Prop                | Type                                     | Default          | Description                                       |
| ------------------- | ---------------------------------------- | ---------------- | ------------------------------------------------- |
| `allowDragAnywhere` | `boolean`                                | `false`          | Enable dragging from anywhere in the content area |
| `sizeBreakpoints`   | `number[]`                               | `[50]`           | Array of size percentages (1-100)                 |
| `position`          | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'`       | Drawer position                                   |
| `defaultOpen`       | `boolean`                                | `false`          | Whether drawer starts open                        |
| `id`                | `string`                                 | `'magic-drawer'` | Unique identifier for the drawer                  |

## Intelligent Space Detection

The drawer automatically detects available screen space and intelligently adjusts behavior for optimal usability:

- **Limited space (<500px)**: Automatically opens at the largest breakpoint for better content visibility
- **Ample space (≥500px)**: Opens at the first breakpoint as normal
- **Smart closing**: In limited space mode, allows direct closing from the largest breakpoint with a single gesture
- **Dynamic detection**: Responds to window resize and orientation changes in real-time
- **Direction-aware**:
  - **Top/Bottom drawers**: Monitors vertical space (window height)
  - **Left/Right drawers**: Monitors horizontal space (window width)
- **Always enabled**: Space detection works automatically without any configuration needed

### Space Detection Example

```tsx
<MagicDrawer sizeBreakpoints={[30, 60, 90]} position="bottom">
  {({ currentBreakpointIndex }) => (
    <div className="p-4">
      <h2>Intelligent Drawer</h2>
      <p>On small screens, this opens at 90% automatically!</p>
      <p>On large screens, this opens at 30% for subtle presence.</p>
      <p>Current breakpoint: {currentBreakpointIndex}</p>
    </div>
  )}
</MagicDrawer>
```

## Advanced Example

```tsx
<MagicDrawer
  id="advanced-drawer"
  sizeBreakpoints={[25, 50, 75, 95]}
  defaultOpen={true}
  position="bottom"
  allowDragAnywhere={true}
  onBreakpointChange={(index, size) => {
    console.log(`Drawer resized to breakpoint ${index} (${size}%)`);
  }}
>
  {({ currentBreakpointIndex, moveToNextBreakpoint }) => (
    <div className="p-4">
      <h2>Advanced Drawer</h2>
      <p>Current breakpoint: {currentBreakpointIndex}</p>

      {/* This button won't interfere with gestures */}
      <button onClick={moveToNextBreakpoint}>Next Breakpoint</button>

      {/* This area supports gesture dragging */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p>Drag anywhere in this content area to resize!</p>
        <p>The button above is protected from gesture interference.</p>
        <p>On small screens, this drawer starts at the largest size!</p>
      </div>
    </div>
  )}
</MagicDrawer>
```

## Gesture Behavior

- **Expanding**: Drag up (for bottom drawer) to move to larger breakpoints
- **Collapsing**: Drag down (for bottom drawer) to move to smaller breakpoints or close
- **Threshold**: Minimum drag distance of 100px required to trigger breakpoint changes
- **Visual Feedback**: Real-time size changes during dragging
- **Smooth Transitions**: Animated transitions when releasing drag

## Browser Support

- **Touch Events**: Full support on mobile devices
- **Mouse Events**: Desktop support for testing and accessibility
- **Passive Event Listeners**: Optimized for performance
- **Keyboard Support**: ESC key to close drawer
