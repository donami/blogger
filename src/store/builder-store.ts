import { observable, action, computed, toJS } from 'mobx';
import {
  Layout,
  ViewType,
  AreaType,
  ComponentConfig,
} from '../components/page-builder/types';

const computedInitialLayout: Layout = {
  // TODO: remove
  areas: {
    top: {
      layout: {
        width: 12,
      },
      components: [
        {
          component: 'banner',
          layout: {
            width: 12,
          },
          settings: {},
        },
      ],
    },
    bottom: {
      layout: {
        width: 12,
      },
      components: [],
    },
  },
  views: [
    {
      name: 'home',
      path: '/',
      areas: {
        main: {
          layout: {
            width: 12,
          },
          components: [
            {
              component: 'banner',
              layout: {
                width: 12,
              },
              settings: {},
            },
          ],
        },
      },
    },
    {
      name: 'about',
      path: '/',
      areas: {
        main: {
          layout: {
            width: 12,
          },
          components: [
            {
              component: 'video',
              layout: {
                width: 12,
              },
              settings: {},
            },
          ],
        },
      },
    },
  ],
};

type FlatViewType = Omit<ViewType, 'areas'> & {
  areas: string[];
};
type FlatLayout = Omit<Layout, 'views'> & {
  views: FlatViewType[];
};

const initialLayout: FlatLayout = {
  areas: {
    top: {
      layout: {
        width: 12,
      },
      components: [
        {
          component: 'banner',
          layout: {
            width: 12,
          },
          settings: {},
        },
      ],
    },
    bottom: {
      layout: {
        width: 12,
      },
      components: [],
    },
    home_main: {
      layout: {
        width: 12,
      },
      components: [
        {
          component: 'banner',
          layout: {
            width: 12,
          },
          settings: {},
        },
      ],
    },
    about_main: {
      layout: {
        width: 12,
      },
      components: [
        {
          component: 'video',
          layout: {
            width: 12,
          },
          settings: {},
        },
      ],
    },
  },
  views: [
    {
      name: 'home',
      path: '/',
      areas: ['home_main'],
    },
    {
      name: 'about',
      path: '/',
      areas: ['about_main'],
    },
  ],
};

export class BuilderStore {
  // @observable layout: Layout = initialLayout;
  @observable views: FlatViewType[] = initialLayout.views;
  @observable areas: { [key: string]: AreaType } = initialLayout.areas;

  @action.bound
  addArea(areaName: string, area: AreaType, viewName: string) {
    this.areas[areaName] = area;
    if (viewName) {
      const view = this.views.find(v => v.name === viewName);

      if (view) {
        this.views = this.views.map(view => {
          if (view.name === viewName) {
            view.areas = view.areas.concat(areaName);
          }
          return view;
        });
      }
    }
  }

  @action.bound
  addComponent(component: ComponentConfig, areaName: string) {
    this.areas = {
      ...this.areas,
      [areaName]: {
        ...this.areas[areaName],
        components: [...this.areas[areaName].components, component],
      },
    };
  }

  @action.bound
  removeArea(areaName: string) {
    // Should not be possible to remove top or bottom
    if (['top', 'bottom'].indexOf(areaName) > -1) {
      return;
    }

    // Remove area reference in views
    this.views = this.views.map(view => {
      if (view.areas.indexOf(areaName) > -1) {
        view.areas = view.areas.filter(v => v !== areaName);
      }

      return view;
    });

    // Remove the actual area
    const areas = Object.keys(this.areas).reduce<{ [key: string]: AreaType }>(
      (acc, key) => {
        if (key !== areaName) {
          acc[key] = this.areas[key];
        }

        return acc;
      },
      {}
    );
    console.log(areas);
  }

  @action.bound
  updateArea(
    areaName: string,
    change: {
      property: string;
      value: string | number;
      type: 'layout';
    }
  ) {
    this.areas = {
      ...this.areas,
      [areaName]: {
        ...this.areas[areaName],
        [change.type]: {
          ...this.areas[areaName][change.type],
          [change.property]: change.value,
        },
      },
    };
  }

  @action.bound
  updateComponent(
    areaName: string,
    componentIndex: number,
    change: {
      property: string;
      value: string | number;
      type: 'layout' | 'settings';
    }
  ) {
    this.areas = {
      ...this.areas,
      [areaName]: {
        ...this.areas[areaName],
        components: [
          ...this.areas[areaName].components.slice(0, componentIndex),
          {
            ...this.areas[areaName].components[componentIndex],
            [change.type]: {
              [change.property]: change.value,
            },
          },
          ...this.areas[areaName].components.slice(componentIndex + 1),
        ],
      },
    };
  }

  @computed get layout() {
    return {
      views: this.views.map(view => {
        return {
          ...view,
          areas: view.areas.reduce<{ [key: string]: AreaType }>(
            (acc, areaName) => {
              acc[areaName] = this.areas[areaName];
              return acc;
            },
            {}
          ),
        };
      }),
      areas: this.areas,
    };
  }

  // addArea() {
  //   console.log('add area');
  //   this.layout.views.push({
  //     name: 'another!',
  //     path: '/',
  //     areas: {
  //       main: {
  //         layout: {
  //           width: 12,
  //         },
  //         components: [
  //           {
  //             component: 'video',
  //             layout: {
  //               width: 12,
  //             },
  //             settings: {},
  //           },
  //         ],
  //       },
  //     },
  //   });
  // }
}

const store = ((window as any).builderStore = new BuilderStore());

export default store;
