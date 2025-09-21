import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps as SonnerToasterProps } from "sonner";
import { cn } from "@/utils";
import type { ToasterProps } from "./toaster.types";

const Toaster = ({ className, ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as SonnerToasterProps["theme"]}
      className={cn("toaster", className)}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
