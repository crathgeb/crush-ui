import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeftIcon } from 'lucide-react';

/**
 * IMPORTANT: To use this sidebar component, you MUST wrap your component tree with <SidebarProvider>.
 *
 * Basic usage:
 * <SidebarProvider>
 *   <Sidebar>
 *     <SidebarContent>...</SidebarContent>
 *   </Sidebar>
 *   <SidebarInset>
 *     <SidebarTrigger />
 *     Main content...
 *   </SidebarInset>
 * </SidebarProvider>
 *
 * For multiple sidebars, use unique IDs:
 * <SidebarProvider id="left">...</SidebarProvider>
 * <SidebarProvider id="right">...</SidebarProvider>
 */

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/utils';
import { Button } from '../button';
import { Input } from '../input';
import { Separator } from '../separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../sheet';
import { Skeleton } from '../skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../tooltip';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
const SIDEBAR_WIDTH_COOKIE_NAME = 'sidebar_width';
const MIN_SIDEBAR_WIDTH = '12rem';
const MAX_SIDEBAR_WIDTH = '32rem';

type SidebarContextProps = {
  id: string; // Add ID to identify which sidebar this is
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  // New resizable properties
  sidebarWidth: string;
  setSidebarWidth: (width: string) => void;
  isResizing: boolean;
  setIsResizing: (resizing: boolean) => void;
};

// Create a map of contexts for multiple sidebars
const SidebarContexts = new Map<
  string,
  React.Context<SidebarContextProps | null>
>();

// Global registry for sidebar controls that can be accessed from anywhere
const sidebarRegistry = new Map<
  string,
  {
    toggleSidebar: () => void;
    open: boolean;
    state: 'expanded' | 'collapsed';
    // Store the actual state setter function reference
    _setOpenRef: React.MutableRefObject<((open: boolean) => void) | null>;
  }
>();

// Function to get or create a context for a specific ID
function getSidebarContext(id: string) {
  if (!SidebarContexts.has(id)) {
    SidebarContexts.set(
      id,
      React.createContext<SidebarContextProps | null>(null)
    );
  }
  return SidebarContexts.get(id)!;
}

// Function to register a sidebar in the global registry
function registerSidebar(id: string, controls: any) {
  sidebarRegistry.set(id, controls);
}

// Function to get sidebar controls from the global registry
function getSidebarControls(id: string) {
  const controls = sidebarRegistry.get(id);
  if (!controls) {
    throw new Error(
      `Sidebar with id "${id}" not found in registry. Available: ${Array.from(sidebarRegistry.keys()).join(', ')}`
    );
  }
  return controls;
}

// Function to check if a sidebar is available in the registry
function isSidebarAvailable(id: string): boolean {
  return sidebarRegistry.has(id);
}

// Legacy context for backward compatibility
const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar(id: string = 'default') {
  const SidebarContext = getSidebarContext(id);
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error(
      `useSidebar with id "${id}" must be used within a SidebarProvider with the same id. ` +
        `Make sure you have wrapped your component tree with <SidebarProvider id="${id}">. ` +
        `If you're using the default sidebar, you can omit the id prop.`
    );
  }
  return context;
}

function SidebarProvider({
  id = 'default', // Add ID prop
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  id?: string; // Make ID optional with default
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // Create a ref to store the setOpen function so it can be accessed from the registry
  const setOpenRef = React.useRef<
    ((value: boolean | ((value: boolean) => boolean)) => void) | null
  >(null);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}_${id}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open, id]
  );

  // Store the setOpen function in the ref so it can be accessed from the registry
  React.useEffect(() => {
    setOpenRef.current = setOpen;
  }, [setOpen]);

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      const result = setOpenMobile((open) => {
        return !open;
      });
      return result;
    } else {
      // Use the ref to ensure we're calling the current setOpen function
      if (setOpenRef.current) {
        const result = setOpenRef.current((currentOpen) => {
          const newOpen = !currentOpen;
          return newOpen;
        });
        return result;
      } else {
        return undefined;
      }
    }
  }, [isMobile, setOpenMobile, id]); // Removed setOpen and open from dependencies

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';


  // State for resizable sidebar
  const [sidebarWidth, setSidebarWidthState] = React.useState(SIDEBAR_WIDTH);
  const [isResizing, setIsResizingState] = React.useState(false);

  // Load saved sidebar width from cookie on mount
  React.useEffect(() => {
    const savedWidth = document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${SIDEBAR_WIDTH_COOKIE_NAME}_${id}`))
      ?.split('=')[1];

    if (savedWidth) {
      setSidebarWidthState(savedWidth);
    }
  }, [id]);

  const setSidebarWidth = React.useCallback(
    (width: string) => {
      // Parse CSS values to numbers for comparison
      const parseWidth = (cssWidth: string) => {
        const match = cssWidth.match(/^(\d+(?:\.\d+)?)(rem|px|em)$/);
        if (match) {
          const value = parseFloat(match[1]);
          const unit = match[2];
          // Convert to rem for consistent comparison
          if (unit === 'px') return value / 16; // 16px = 1rem
          if (unit === 'em') return value; // 1em = 1rem (assuming root font size)
          return value; // Already in rem
        }
        return 16; // Default fallback
      };

      const currentWidth = parseWidth(width);
      const minWidth = parseWidth(MIN_SIDEBAR_WIDTH);
      const maxWidth = parseWidth(MAX_SIDEBAR_WIDTH);

      // Ensure width is within bounds
      const clampedValue = Math.max(minWidth, Math.min(maxWidth, currentWidth));
      const clampedWidth = `${clampedValue}rem`;

      setSidebarWidthState(clampedWidth);
      document.cookie = `${SIDEBAR_WIDTH_COOKIE_NAME}_${id}=${clampedWidth}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [id]
  );

  const setIsResizing = React.useCallback((resizing: boolean) => {
    setIsResizingState(resizing);
  }, []);

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      id, // Include ID in context
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      sidebarWidth,
      setSidebarWidth,
      isResizing,
      setIsResizing,
    }),
    [
      id,
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      sidebarWidth,
      setSidebarWidth,
      isResizing,
      setIsResizing,
    ]
  );

  // Register this sidebar in the global registry so triggers can access it from anywhere
  React.useEffect(() => {
    const controls = {
      toggleSidebar,
      open,
      state,
      _setOpenRef: setOpenRef,
    };

    registerSidebar(id, controls);

    // Cleanup when component unmounts
    return () => {
      sidebarRegistry.delete(id);
    };
  }, [id, toggleSidebar, setOpenRef, open, state]);

  // Update registry whenever key values change to prevent stale closures
  React.useEffect(() => {
    if (sidebarRegistry.has(id)) {
      const controls = {
        toggleSidebar,
        open,
        state,
        _setOpenRef: setOpenRef,
      };
      registerSidebar(id, controls);
    }
  }, [id, toggleSidebar, setOpenRef, open, state]);

  // Set CSS variables globally on document root for better accessibility
  React.useEffect(() => {
    const root = document.documentElement;

    // Core width variables
    root.style.setProperty(`--sidebar-width-${id}`, sidebarWidth);
    root.style.setProperty(`--sidebar-width-icon-${id}`, SIDEBAR_WIDTH_ICON);

    // State-based variables
    root.style.setProperty(`--sidebar-state-${id}`, state);
    root.style.setProperty(`--sidebar-open-${id}`, open ? '1' : '0');

    // Responsive variables
    root.style.setProperty(`--sidebar-mobile-${id}`, isMobile ? '1' : '0');

    // Calculated variables for common use cases
    const widthValue = parseFloat(sidebarWidth);
    root.style.setProperty(`--sidebar-width-${id}-px`, `${widthValue * 16}px`);
    root.style.setProperty(
      `--sidebar-width-${id}-vw`,
      `${((widthValue * 16) / window.innerWidth) * 100}vw`
    );

    // Cleanup when component unmounts
    return () => {
      root.style.removeProperty(`--sidebar-width-${id}`);
      root.style.removeProperty(`--sidebar-width-icon-${id}`);
      root.style.removeProperty(`--sidebar-state-${id}`);
      root.style.removeProperty(`--sidebar-open-${id}`);
      root.style.removeProperty(`--sidebar-mobile-${id}`);
      root.style.removeProperty(`--sidebar-width-${id}-px`);
      root.style.removeProperty(`--sidebar-width-${id}-vw`);
    };
  }, [id, sidebarWidth, state, open, isMobile]);

  const SidebarContext = getSidebarContext(id);

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          key={`sidebar-provider-${id}`} // Add stable key to prevent remounting
          data-slot="sidebar-wrapper"
          data-sidebar-id={id} // Add ID to DOM for debugging
          style={
            {
              [`--sidebar-width-${id}`]: sidebarWidth,
              [`--sidebar-width-icon-${id}`]: SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-sidebar min-h-svh',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  isDraggable = false,
  sidebarId = 'default', // Add sidebarId prop
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  isDraggable?: boolean;
  sidebarId?: string; // Make it optional with default
}) {
  // Try to get sidebar data from context first, then fall back to global registry
  let sidebarData: any = null;

  try {
    // Try to use the context (when inside provider)
    sidebarData = useSidebar(sidebarId);
  } catch (error) {
    // If not inside provider, try to get from global registry
    try {
      sidebarData = getSidebarControls(sidebarId);
    } catch (registryError) {
      return null;
    }
  }

  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    isResizing,
    sidebarWidth,
  } = sidebarData;

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full flex-col',
          className
        )}
        style={{
          width: `var(--sidebar-width-${sidebarId})`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground p-0 [&>button]:hidden"
          style={
            {
              width: SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        data-sidebar-id={sidebarId} // Add ID to DOM
        className={cn(
          'relative bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible:icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible:icon]:w-(--sidebar-width-icon)'
        )}
        style={{
          width: state === 'expanded' ? sidebarWidth : undefined,
        }}
      />
      <div
        data-slot="sidebar-container"
        data-sidebar-id={sidebarId} // Add ID to DOM
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh md:flex',
          // Disable transitions during resizing for immediate feedback
          'transition-[left,right,width] duration-200 ease-linear',
          side === 'left'
            ? `left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width-${sidebarId})*-1)]`
            : `right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width-${sidebarId})*-1)]`,
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? `p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon-${sidebarId})+(--spacing(4))+2px)]`
            : `group-data-[collapsible=icon]:w-[var(--sidebar-width-icon-${sidebarId})] group-data-[side=left]:border-r group-data-[side=right]:border-l`,
          className
        )}
        style={{
          // Set width directly and disable transitions during resizing
          width: state === 'expanded' ? sidebarWidth : undefined,
          transition: isResizing ? 'none' : undefined,
        }}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border relative flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
          {/* Add resizer only when sidebar is expanded and not in icon mode */}
          {state === 'expanded' && collapsible !== 'icon' && (
            <SidebarResizer
              data-side={side}
              isDraggable={isDraggable}
              sidebarId={sidebarId}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  sidebarId = 'default', // Add sidebarId prop
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button> & {
  sidebarId?: string; // Make it optional with default
}) {
  // State to track if we should retry registry lookup
  const [retryCount, setRetryCount] = React.useState(0);
  const maxRetries = 3;

  // Try to use the context first (when inside provider)
  let toggleSidebar: (() => void) | null = null;
  let isInsideProvider = false;

  try {
    const context = useSidebar(sidebarId);
    toggleSidebar = context.toggleSidebar;
    isInsideProvider = true;
  } catch (error) {
    // If not inside provider, try to get from global registry
    try {
      const controls = getSidebarControls(sidebarId);
      toggleSidebar = controls.toggleSidebar;
    } catch (registryError) {
      // If we haven't exceeded max retries, schedule a retry
      if (retryCount < maxRetries) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
        }, 100);

        // Return a loading state while retrying
        return (
          <Button
            data-sidebar="trigger"
            data-sidebar-id={sidebarId}
            data-slot="sidebar-trigger"
            variant="ghost"
            size="default"
            className={cn('size-7 animate-pulse opacity-50', className)}
            disabled
            title={`Loading sidebar "${sidebarId}"...`}
            {...props}
          >
            <PanelLeftIcon />
            <span className="sr-only">Loading Sidebar {sidebarId}</span>
          </Button>
        );
      }

      // If we've exhausted retries, show a helpful error
      // Return a disabled button
      return (
        <Button
          data-sidebar="trigger"
          data-sidebar-id={sidebarId}
          data-slot="sidebar-trigger"
          variant="destructive"
          size="default"
          className={cn('size-7 opacity-50', className)}
          disabled
          title={`Sidebar "${sidebarId}" not found`}
          {...props}
        >
          <PanelLeftIcon />
          <span className="sr-only">
            Toggle Sidebar {sidebarId} (not available)
          </span>
        </Button>
      );
    }
  }


  // Ensure toggleSidebar is available
  if (!toggleSidebar) {
    return (
      <div className="m-2 border-2 border-red-500 bg-yellow-500 p-2 text-black">
        ❌ toggleSidebar is falsy: {String(toggleSidebar)}
      </div>
    );
  }

  if (typeof toggleSidebar !== 'function') {
    return (
      <div className="m-2 border-2 border-red-500 bg-yellow-500 p-2 text-black">
        ❌ toggleSidebar is not a function: {typeof toggleSidebar}
      </div>
    );
  }


  return (
    <Button
      data-sidebar="trigger"
      data-sidebar-id={sidebarId} // Add ID to DOM
      data-slot="sidebar-trigger"
      variant="ghost"
      size="default"
      className={cn('size-7', className)} // Removed debugging styles
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar {sidebarId}</span>
    </Button>
  );
}

function SidebarRail({
  sidebarId = 'default', // Add sidebarId prop
  className,
  ...props
}: React.ComponentProps<'button'> & {
  sidebarId?: string; // Make it optional with default
}) {
  const { toggleSidebar } = useSidebar(sidebarId);

  return (
    <button
      data-sidebar="rail"
      data-sidebar-id={sidebarId} // Add ID to DOM
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'bg-background relative flex w-full flex-1 flex-col',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('bg-sidebar-border mx-2 w-auto', className)}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  sidebarId = 'default', // Add sidebarId prop
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  sidebarId?: string; // Make it optional with default
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar(sidebarId);

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-sidebar-id={sidebarId} // Add ID to DOM
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
        'peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

function SidebarResizer({
  className,
  isDraggable = true,
  sidebarId = 'default', // Add sidebarId prop
  'data-side': dataSide = 'left', // Extract the data-side attribute
  ...props
}: React.ComponentProps<'div'> & {
  isDraggable?: boolean;
  sidebarId?: string; // Make it optional with default
  'data-side'?: 'left' | 'right'; // Add this prop
}) {
  const { sidebarWidth, setSidebarWidth, setIsResizing } =
    useSidebar(sidebarId);
  const [isDragging, setIsDragging] = React.useState(false);
  const isDraggingRef = React.useRef(false); // Use ref to track dragging state
  const startX = React.useRef(0);
  const startWidth = React.useRef(0);

  // Use refs to store stable function references
  const handleMouseMoveRef = React.useRef<((e: MouseEvent) => void) | null>(
    null
  );
  const handleMouseUpRef = React.useRef<(() => void) | null>(null);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (!isDraggable) return;

      e.preventDefault();
      setIsDragging(true);
      isDraggingRef.current = true; // Set the ref
      setIsResizing(true);
      startX.current = e.clientX;

      // Parse the current sidebar width properly
      const match = sidebarWidth.match(/^(\d+(?:\.\d+)?)(rem|px|em)$/);
      startWidth.current = match ? parseFloat(match[1]) : 16; // Default to 16rem if parsing fails

      // Store the current function references
      handleMouseMoveRef.current = handleMouseMove;
      handleMouseUpRef.current = handleMouseUp;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [sidebarWidth, setIsResizing, isDraggable]
  );

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - startX.current;
      // For right-side sidebars, invert the delta direction
      const adjustedDeltaX = dataSide === 'right' ? -deltaX : deltaX;
      const newWidth = startWidth.current + adjustedDeltaX / 16; // Convert pixels to rem

      // Use the same constraints as defined in the constants (12rem to 32rem)
      const clampedWidth = Math.max(12, Math.min(32, newWidth));
      const clampedWidthString = `${clampedWidth}rem`;

      setSidebarWidth(clampedWidthString);

      // Directly update the sidebar container width for immediate feedback
      const sidebarContainer = document.querySelector(
        `[data-slot="sidebar-container"][data-sidebar-id="${sidebarId}"]`
      );
      const sidebarGap = document.querySelector(
        `[data-slot="sidebar-gap"][data-sidebar-id="${sidebarId}"]`
      );

      if (sidebarContainer) {
        (sidebarContainer as HTMLElement).style.width = clampedWidthString;
      }

      if (sidebarGap) {
        (sidebarGap as HTMLElement).style.width = clampedWidthString;
      }
    },
    [setSidebarWidth, dataSide, sidebarId]
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false; // Reset the ref
    setIsResizing(false);

    // Use the stored function references for cleanup
    if (handleMouseMoveRef.current) {
      document.removeEventListener('mousemove', handleMouseMoveRef.current);
    }
    if (handleMouseUpRef.current) {
      document.removeEventListener('mouseup', handleMouseUpRef.current);
    }
  }, [setIsResizing]);

  React.useEffect(() => {
    return () => {
      // Use the stored function references for cleanup
      if (handleMouseMoveRef.current) {
        document.removeEventListener('mousemove', handleMouseMoveRef.current);
      }
      if (handleMouseUpRef.current) {
        document.removeEventListener('mouseup', handleMouseUpRef.current);
      }
    };
  }, []);

  return (
    <div
      data-slot="sidebar-resizer"
      data-sidebar="resizer"
      data-sidebar-id={sidebarId} // Add ID to DOM
      className={cn(
        'absolute inset-y-0 z-20 w-1 bg-transparent transition-colors',
        'group-data-[side=left]:-right-0.5 group-data-[side=right]:-left-0.5',
        isDragging && 'bg-sidebar-border',
        isDraggable
          ? 'hover:bg-sidebar-border/50 cursor-col-resize'
          : 'cursor-default',
        className
      )}
      onMouseDown={handleMouseDown}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarResizer,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};

// Utility functions for working with global sidebar CSS variables
export const getSidebarCSSVariable = (id: string, variable: string): string => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--sidebar-${variable}-${id}`)
    .trim();
};

export const getSidebarWidth = (id: string): string => {
  return getSidebarCSSVariable(id, 'width');
};

export const getSidebarState = (id: string): 'expanded' | 'collapsed' => {
  const state = getSidebarCSSVariable(id, 'state');
  return state === 'expanded' ? 'expanded' : 'collapsed';
};

export const isSidebarOpen = (id: string): boolean => {
  return getSidebarCSSVariable(id, 'open') === '1';
};

export const isSidebarMobile = (id: string): boolean => {
  return getSidebarCSSVariable(id, 'mobile') === '1';
};

export const getAllSidebarIds = (): string[] => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const sidebarIds: string[] = [];

  // Look for sidebar width variables to find all registered IDs
  for (let i = 0; i < computedStyle.length; i++) {
    const property = computedStyle[i];
    if (
      property.startsWith('--sidebar-width-') &&
      !property.includes('-icon-') &&
      !property.includes('-px') &&
      !property.includes('-vw')
    ) {
      const id = property.replace('--sidebar-width-', '');
      if (id && !sidebarIds.includes(id)) {
        sidebarIds.push(id);
      }
    }
  }

  return sidebarIds;
};
