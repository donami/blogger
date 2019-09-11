export type LayoutConfig = {
  width?: number;
};

export type ComponentConfig = {
  component: string;
  layout: LayoutConfig;
  settings: { [key: string]: any };
};

export type AreaType = {
  layout: LayoutConfig;
  removable: boolean;
  components: ComponentConfig[];
};

export type ViewType = {
  name: string;
  path: string;
  areas: { [key: string]: AreaType };
};

export type ThemeConfig = {
  colors: {
    primary: string;
  };
  pageWidth: string;
};

export type Layout = {
  theme: ThemeConfig;
  areas: { [key: string]: AreaType };
  views: ViewType[];
};
