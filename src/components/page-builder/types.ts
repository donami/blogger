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
  components: ComponentConfig[];
};

export type ViewType = {
  name: string;
  path: string;
  areas: { [key: string]: AreaType };
};

export type Layout = {
  areas: { [key: string]: AreaType };
  views: ViewType[];
};
