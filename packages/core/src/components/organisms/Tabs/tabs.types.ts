import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {}

export interface TabsListProps extends React.ComponentProps<typeof TabsPrimitive.List> {}

export interface TabsTriggerProps extends React.ComponentProps<typeof TabsPrimitive.Trigger> {}

export interface TabsContentProps extends React.ComponentProps<typeof TabsPrimitive.Content> {}