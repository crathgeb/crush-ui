import React, { type PropsWithChildren, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/atoms/sidebar";
import type { SidebarPageTemplateProps } from "./sidebar-page-template.types";

export const SidebarPageTemplate = ({
  sidebar,
  rightSidebar,
  header,
  footer,
  collapsible = true,
  children,
}: PropsWithChildren<SidebarPageTemplateProps>) => {
  useEffect(() => {
    // Set body className when component mounts
    document.body.classList.add("bg-background", "text-foreground");

    // Clean up when component unmounts
    return () => {
      document.body.classList.remove("bg-background", "text-foreground");
    };
  }, []);

  return (
    <div className="flex min-h-svh w-full">
      <SidebarProvider id="sidebar-left">
        <div className="hidden md:block">{sidebar}</div>
      </SidebarProvider>

      <main className="relative flex-1">
        {(collapsible || header) && (
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              {collapsible && <SidebarTrigger sidebarId="sidebar-left" />}
              {header && <div className="flex-1">{header}</div>}
            </div>
          </div>
        )}

        {/* Add bottom padding on mobile to account for fixed bottom nav */}
        <div className="pb-20">{children}</div>
        {footer && (
          <footer className="fixed right-[var(--sidebar-width-sidebar-right,0)] bottom-0 left-[var(--sidebar-width-sidebar-left,0)] z-50 h-10">
            {footer}
          </footer>
        )}
      </main>
      {rightSidebar && (
        <SidebarProvider id="sidebar-right">
          <div className="hidden md:block">{rightSidebar}</div>
        </SidebarProvider>
      )}
    </div>
  );
};
