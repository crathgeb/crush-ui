import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@crush-ux/core";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component that supports multiple variants, sizes, and can render as different elements using the asChild prop.\n\n## Table of Contents\n\n[Component Usage Guidelines](#component-usage-guidelines)  \n[Developer Notes](#developer-notes)  \n[Stories](#stories)  \n&nbsp;&nbsp;&nbsp;&nbsp;[Default](#story--atoms-button--default)  \n&nbsp;&nbsp;&nbsp;&nbsp;[Variants](#story--atoms-button--variants)  \n&nbsp;&nbsp;&nbsp;&nbsp;[Sizes](#story--atoms-button--sizes)  \n&nbsp;&nbsp;&nbsp;&nbsp;[As Child](#story--atoms-button--as-child)  \n&nbsp;&nbsp;&nbsp;&nbsp;[Playground](#story--atoms-button--playground)  \n\n## Component Usage Guidelines\n\n**When to use:**\n- For primary actions in forms, dialogs, and pages\n- When you need consistent button styling across the application\n- For interactive elements that trigger actions or navigation\n\n**When not to use:**\n- For simple text links (use Link component instead)\n- For complex interactive elements that need custom behavior\n- When you need elements that don't semantically represent actions\n\n## Developer Notes\n\n- Uses Radix UI Slot for polymorphic rendering when asChild is true\n- Built with class-variance-authority for type-safe variant management\n- Supports all native button props through React.ComponentProps\n- Includes data-slot attribute for styling hooks and testing",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "Visual style variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size of the button",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as a child element using Radix Slot",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the button is disabled",
    },
    children: {
      control: { type: "text" },
      description: "Content to display inside the button",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => <Button>Click me</Button>;

export const Default: Story = {
  render: () => <DefaultComponent />,
  parameters: {
    docs: {
      description: {
        story:
          "The default button with standard styling and medium size.\n\n```tsx\n<Button>Click me</Button>\n```",
      },
    },
  },
};

const VariantsComponent = () => (
  <div className="flex flex-wrap gap-4">
    <Button variant="default">Default</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
);

export const Variants: Story = {
  render: () => <VariantsComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'All available button variants showcasing different visual styles.\n\n```tsx\n<Button variant="default">Default</Button>\n<Button variant="destructive">Destructive</Button>\n<Button variant="outline">Outline</Button>\n<Button variant="secondary">Secondary</Button>\n<Button variant="ghost">Ghost</Button>\n<Button variant="link">Link</Button>\n```',
      },
    },
  },
};

const SizesComponent = () => (
  <div className="flex items-end gap-4">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const Sizes: Story = {
  render: () => <SizesComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Button component in different sizes for various use cases.\n\n```tsx\n<Button size="sm">Small</Button>\n<Button size="md">Medium</Button>\n<Button size="lg">Large</Button>\n```',
      },
    },
  },
};

const AsChildComponent = () => (
  <Button asChild>
    <a href="#" className="no-underline">
      Link Button
    </a>
  </Button>
);

export const AsChild: Story = {
  render: () => <AsChildComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Using the asChild prop to render the button as a different element while maintaining button styling.\n\n```tsx\n<Button asChild>\n  <a href="#" className="no-underline">\n    Link Button\n  </a>\n</Button>\n```',
      },
    },
  },
};

const PlaygroundComponent = (args: any) => (
  <Button {...args}>{args.children || "Button"}</Button>
);

export const Playground: Story = {
  render: (args) => <PlaygroundComponent {...args} />,
  args: {
    variant: "default",
    size: "md",
    children: "Interactive Button",
    disabled: false,
    asChild: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test different button configurations. Use the controls below to experiment with various props.\n\n```tsx\n<Button\n  variant="default"\n  size="md"\n  disabled={false}\n  asChild={false}\n>\n  Interactive Button\n</Button>\n```',
      },
    },
  },
};
