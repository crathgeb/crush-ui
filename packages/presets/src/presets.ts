import type { ButtonProps } from "@crush-ux/core";

export interface ComponentPreset<T = any> {
  defaultProps: Partial<T>;
  className?: string;
}

export interface ButtonPreset extends ComponentPreset<ButtonProps> {
  defaultProps: Partial<ButtonProps>;
}

export const buttonPresets = {
  default: {
    defaultProps: {
      variant: "primary" as const,
      size: "medium" as const,
    },
  },
  minimal: {
    defaultProps: {
      variant: "secondary" as const,
      size: "small" as const,
    },
    className: "crush-button--minimal",
  },
  hero: {
    defaultProps: {
      variant: "primary" as const,
      size: "large" as const,
    },
    className: "crush-button--hero",
  },
} satisfies Record<string, ButtonPreset>;

export type ButtonPresetName = keyof typeof buttonPresets;
