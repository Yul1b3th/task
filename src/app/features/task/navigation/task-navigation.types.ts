// task-navigation.types.ts

export interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
  exact?: boolean;
  showInSidebar?: boolean;
}
