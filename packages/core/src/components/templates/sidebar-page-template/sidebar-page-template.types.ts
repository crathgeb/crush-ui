import React from 'react';

export interface SidebarPageTemplateProps {
  sidebar?: React.JSX.Element;
  rightSidebar?: React.JSX.Element;
  header?: React.JSX.Element;
  footer?: React.JSX.Element;
  collapsible?: boolean;
}