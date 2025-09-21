# StackNavigator Component

A flexible, animated stack-based navigation system with smooth transitions and comprehensive state management.

## Features

- **Stack-based navigation**: Push and pop screens with automatic stack management
- **Smooth animations**: Fluid slide transitions between screens with configurable timing
- **Pending state handling**: Intelligent management of screen transitions to prevent animation conflicts
- **Flexible screen rendering**: Screens can be scrollable or fixed based on content needs
- **Callback support**: React to screen visibility changes with onShown/onHidden callbacks
- **Root navigation**: Quick navigation back to the initial screen
- **Stack change monitoring**: Listen to stack changes for external state synchronization
- **Memory efficient**: Only renders visible and transitioning screens
- **Auto-reset on hidden**: Automatically resets stack to initial state when navigator goes off-screen (configurable)

## Basic Usage

```tsx
import { StackNavigator, StackScreen } from './StackNavigator';

function MyApp() {
  return (
    <StackNavigator initialScreen="home">
      {({ currentScreen, pushScreen, popScreen, canGoBack }) => (
        <>
          <StackScreen screenId="home">
            <div className="p-4">
              <h1>Home Screen</h1>
              <button onClick={() => pushScreen('profile')}>
                Go to Profile
              </button>
            </div>
          </StackScreen>

          <StackScreen screenId="profile">
            <div className="p-4">
              <h1>Profile Screen</h1>
              {canGoBack && <button onClick={popScreen}>Back</button>}
              <button onClick={() => pushScreen('settings')}>Settings</button>
            </div>
          </StackScreen>

          <StackScreen screenId="settings">
            <div className="p-4">
              <h1>Settings Screen</h1>
              <button onClick={popScreen}>Back</button>
            </div>
          </StackScreen>
        </>
      )}
    </StackNavigator>
  );
}
```

## StackNavigator Props

| Prop            | Type                                  | Default  | Description                                                            |
| --------------- | ------------------------------------- | -------- | ---------------------------------------------------------------------- |
| `children`      | `ReactNode \| (context) => ReactNode` | Required | Screen components or render function                                   |
| `initialScreen` | `string`                              | `'main'` | The initial screen ID to display                                       |
| `onStackChange` | `(stack: string[]) => void`           | -        | Callback fired when the screen stack changes                           |
| `resetOnHidden` | `boolean`                             | `true`   | Whether to reset stack to initial state when navigator goes off-screen |

## StackScreen Props

| Prop         | Type         | Default  | Description                                     |
| ------------ | ------------ | -------- | ----------------------------------------------- |
| `screenId`   | `string`     | Required | Unique identifier for the screen                |
| `children`   | `ReactNode`  | Required | Screen content                                  |
| `onShown`    | `() => void` | -        | Callback when screen becomes visible            |
| `onHidden`   | `() => void` | -        | Callback when screen becomes hidden             |
| `className`  | `string`     | `''`     | Additional CSS classes for the screen           |
| `scrollable` | `boolean`    | `true`   | Whether the screen content should be scrollable |

## Navigation Context

The `StackNavigator` provides a context with the following properties and methods:

| Property           | Type                   | Description                                 |
| ------------------ | ---------------------- | ------------------------------------------- |
| `currentScreen`    | `string`               | ID of the currently visible screen          |
| `screenStack`      | `string[]`             | Array of screen IDs in the current stack    |
| `animatingScreens` | `string[]`             | Array of screen IDs currently animating out |
| `pendingScreen`    | `string \| null`       | Screen ID that is pending transition        |
| `canGoBack`        | `boolean`              | Whether there are screens to go back to     |
| `pushScreen`       | `(id: string) => void` | Navigate to a new screen                    |
| `popScreen`        | `() => void`           | Go back to the previous screen              |
| `goToRoot`         | `() => void`           | Navigate back to the initial screen         |

## Advanced Usage

### With Render Function

```tsx
<StackNavigator
  initialScreen="dashboard"
  onStackChange={(stack) => console.log('Stack changed:', stack)}
>
  {({ currentScreen, pushScreen, popScreen, screenStack }) => (
    <div className="h-full">
      {/* Navigation breadcrumb */}
      <div className="flex gap-2 bg-gray-100 p-2">
        {screenStack.map((screenId, index) => (
          <span key={screenId} className="text-sm">
            {screenId}
            {index < screenStack.length - 1 && ' > '}
          </span>
        ))}
      </div>

      {/* Screens */}
      <StackScreen screenId="dashboard">
        <DashboardContent onNavigate={pushScreen} />
      </StackScreen>

      <StackScreen screenId="users">
        <UsersContent onSelectUser={(id) => pushScreen(`user-${id}`)} />
      </StackScreen>

      <StackScreen
        screenId="user-detail"
        onShown={() => console.log('User detail shown')}
        onHidden={() => console.log('User detail hidden')}
      >
        <UserDetailContent onBack={popScreen} />
      </StackScreen>
    </div>
  )}
</StackNavigator>
```

### Non-Scrollable Screens

```tsx
<StackScreen
  screenId="modal-like-screen"
  scrollable={false}
  className="flex items-center justify-center"
>
  <div className="max-w-md rounded-lg bg-white p-6 shadow-lg">
    <h2>Modal-like Screen</h2>
    <p>This screen doesn't scroll and centers its content</p>
  </div>
</StackScreen>
```

### Auto-Reset Behavior

By default, the StackNavigator automatically resets its stack to the initial state when it goes off-screen (e.g., when a parent component hides it or when scrolling past it). This prevents state leakage and ensures a clean user experience when the navigator becomes visible again.

```tsx
// Default behavior - auto-reset enabled
<StackNavigator initialScreen="home">
  {/* ... */}
</StackNavigator>

// Disable auto-reset if you want to preserve state
<StackNavigator initialScreen="home" resetOnHidden={false}>
  {/* Stack state will be preserved even when off-screen */}
</StackNavigator>
```

The reset behavior uses the Intersection Observer API to detect when the navigator becomes invisible. This provides better performance compared to polling-based solutions and works with various scenarios like:

- Parent container visibility changes
- Scrolling the navigator out of view
- Tab switching or window minimization (depending on browser implementation)

### Using the Hook Directly

```tsx
import { useStackNavigator } from './StackNavigator';

function NavigationButton() {
  const { pushScreen, currentScreen, canGoBack } = useStackNavigator();

  return (
    <div>
      <p>Current: {currentScreen}</p>
      <button onClick={() => pushScreen('next')} disabled={!canGoBack}>
        Go Forward
      </button>
    </div>
  );
}
```

## Animation Behavior

- **Push transitions**: New screens slide in from the right
- **Pop transitions**: Current screen slides out to the right, revealing the previous screen
- **Smooth timing**: 300ms duration with ease-out timing function
- **Z-index management**: Proper layering ensures smooth visual transitions
- **Memory optimization**: Screens that are no longer visible or animating are unmounted

## State Management

The StackNavigator manages several important states:

- **Screen Stack**: Maintains the history of navigated screens
- **Animating Screens**: Tracks screens currently transitioning out
- **Pending Screen**: Handles the brief moment when a new screen is being pushed
- **Current Screen**: Determines which screen is currently visible

### Pending State Optimization

The component uses a sophisticated pending state system to ensure smooth animations:

1. When pushing a screen, it's briefly marked as "pending"
2. The previous screen remains visible during this brief moment
3. After one animation frame, the pending state is cleared and the transition begins
4. This prevents visual glitches and ensures smooth animations

## Browser Support

- **CSS Transforms**: Full support for modern browsers
- **RequestAnimationFrame**: Used for optimal animation timing
- **Cleanup Handling**: Proper timeout cleanup to prevent memory leaks
- **Responsive**: Works on all screen sizes and orientations
