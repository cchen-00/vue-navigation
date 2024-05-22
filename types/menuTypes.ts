export interface MenuSubItem {
  title: string;
  url: string;
}

export interface MenuItem {
  title: string;
  url: string;
  items: MenuSubItem[];
}
