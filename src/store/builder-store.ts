import { observable, action, computed, toJS } from 'mobx';
import {
  Layout,
  ViewType,
  AreaType,
  ComponentConfig,
} from '../components/page-builder/types';

// const computedInitialLayout: Layout = {
//   // TODO: remove
//   theme: {
//     colors: {
//       primary: '#0074D9',
//     },
//     pageWidth: '1024px',
//   },
//   areas: {
//     top: {
//       layout: {
//         width: 12,
//       },
//       removable: false,
//       components: [
//         {
//           component: 'banner',
//           layout: {
//             width: 12,
//           },
//           settings: {},
//         },
//       ],
//     },
//     bottom: {
//       layout: {
//         width: 12,
//       },
//       removable: false,
//       components: [],
//     },
//   },
//   views: [
//     {
//       name: 'home',
//       path: '/',
//       areas: {
//         main: {
//           layout: {
//             width: 12,
//           },
//           removable: false,
//           components: [
//             {
//               component: 'banner',
//               layout: {
//                 width: 12,
//               },
//               settings: {},
//             },
//           ],
//         },
//       },
//     },
//     {
//       name: 'about',
//       path: '/',
//       areas: {
//         main: {
//           layout: {
//             width: 12,
//           },
//           removable: false,
//           components: [
//             {
//               component: 'video',
//               layout: {
//                 width: 12,
//               },
//               settings: {},
//             },
//           ],
//         },
//       },
//     },
//   ],
// };

type FlatViewType = Omit<ViewType, 'areas'> & {
  areas: string[];
};
type FlatLayout = Omit<Layout, 'views'> & {
  views: FlatViewType[];
};

const initialLayout: FlatLayout = {
  theme: {
    colors: {
      primary: '#0074D9',
    },
    pageWidth: '1024px',
  },
  areas: {
    top: {
      layout: {
        width: 12,
      },
      removable: false,
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
      removable: false,
      components: [],
    },
    home_main: {
      layout: {
        width: 12,
      },
      removable: false,
      components: [],
    },
    about_main: {
      layout: {
        width: 12,
      },
      removable: false,
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

const handleDuplicate = (name: string) => {
  if (name.match(/-[0-9]*$/)) {
    return name.replace(/-([0-9]*)$/, n => {
      let num = +n.substr(1);
      return `-${num + 1}`;
    });
  }
  return `${name}-1`;
};

const generateName: any = (name: string, areas: { [key: string]: any }) => {
  if (areas[name]) {
    const newName = handleDuplicate(name);
    return generateName(newName, areas);
  }
  return name;
};

export class BuilderStore {
  @observable views: FlatViewType[] = initialLayout.views;
  @observable areas: { [key: string]: AreaType } = initialLayout.areas;

  @action.bound
  addArea(areaName: string, area: AreaType, viewName: string) {
    let newAreaName = generateName(areaName, this.areas);

    this.areas[newAreaName] = area;
    if (viewName) {
      const view = this.views.find(v => v.name === viewName);

      if (view) {
        this.views = this.views.map(view => {
          if (view.name === viewName) {
            view.areas = view.areas.concat(newAreaName);
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
    // Remove this? No longer needed due to removable property on area?
    // if (['top', 'bottom'].indexOf(areaName) > -1) {
    //   return;
    // }

    const area = this.areas[areaName];
    if (!area || !area.removable) {
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
  updateAreaName(areaName: string, newName: string) {
    this.areas = Object.keys(this.areas).reduce<{ [key: string]: AreaType }>(
      (acc, name) => {
        if (name === areaName) {
          acc[newName] = this.areas[name];
        } else {
          acc[name] = this.areas[name];
        }
        return acc;
      },
      {}
    );

    this.views = this.views.map(view => {
      if (view.areas.indexOf(areaName) > -1) {
        return {
          ...view,
          areas: view.areas.map(name => {
            if (name === areaName) {
              return newName;
            }
            return name;
          }),
        };
      }
      return view;
    });
  }

  @action.bound
  removeComponent(areaName: string, componentIndex: number) {
    this.areas = {
      ...this.areas,
      [areaName]: {
        ...this.areas[areaName],
        components: [
          ...this.areas[areaName].components.slice(0, componentIndex),
          ...this.areas[areaName].components.slice(componentIndex + 1),
        ],
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

  @action.bound
  moveArea(viewName: string, areas: string[]) {
    this.views = this.views.map(view => {
      if (view.name === viewName) {
        return {
          ...view,
          areas,
        };
      }
      return view;
    });
  }

  @computed get layout() {
    return {
      theme: initialLayout.theme,
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
}

const store = ((window as any).builderStore = new BuilderStore());

export default store;
