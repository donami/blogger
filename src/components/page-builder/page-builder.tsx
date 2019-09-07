import React, { useState } from 'react';
import { Styled } from './page-builder.styles';
import Side from './menu';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './board';
import { DraggableItem } from './item-types';
import { Layout, AreaType } from './types';
import { capitalize } from '../../utils';

const initialLayout: Layout = {
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

type Props = {};
const PageBuilder: React.FC<Props> = () => {
  const [open, setOpen] = useState(true);
  const [layout, setLayout] = useState<Layout>(initialLayout);

  const [currentView, setCurrentView] = useState('home');

  const handleDrop = (item: DraggableItem, area: any) => {
    if (area.name === 'top' || area.name === 'bottom') {
      if (item.componentType === 'area') {
        setLayout({
          ...layout,
          areas: {
            ...layout.areas,
            untitled: {
              components: [],
              layout: {
                width: 12,
              },
            },
          },
        });
      } else {
        setLayout({
          ...layout,
          areas: {
            ...layout.areas,
            [area.name]: {
              ...layout.areas[area.name],
              components: [
                ...layout.areas[area.name].components,
                {
                  component: item.componentType,
                  layout: {
                    width: 12,
                  },
                  settings: {},
                },
              ],
            },
          },
        });
      }
    } else {
      const viewIndex = layout.views.findIndex(
        view => view.name === currentView
      );
      const view = layout.views[viewIndex];

      if (item.componentType === 'area') {
        view.areas = {
          ...view.areas,
          untitled: {
            components: [],
            layout: {
              width: 12,
            },
          },
        };
        setLayout({
          ...layout,
          views: [
            ...layout.views.slice(0, viewIndex),
            view,
            ...layout.views.slice(viewIndex + 1),
          ],
        });
      } else {
        view.areas[area.name].components = [
          ...view.areas[area.name].components,
          {
            component: item.componentType,
            layout: {
              width: 12,
            },
            settings: {},
          },
        ];

        setLayout({
          ...layout,
          views: [
            ...layout.views.slice(0, viewIndex),
            view,
            ...layout.views.slice(viewIndex + 1),
          ],
        });
      }
    }
  };
  const handleSaveArea = (name: string, data: AreaType) => {
    setLayout({
      ...layout,
      areas: {
        ...layout.areas,
        [name]: {
          ...layout.areas[name],
          components: data.components,
        },
      },
    });
  };

  const handleAreaChange = (
    name: string,
    change: {
      property: string;
      value: string | number;
    }
  ) => {
    const viewIndex = layout.views.findIndex(view => view.name === currentView);
    const view = layout.views[viewIndex];
    view.areas = {
      ...view.areas,
      [name]: {
        ...view.areas[name],
        layout: {
          ...view.areas[name].layout,
          [change.property]: change.value,
        },
      },
    };

    if (['top', 'bottom'].indexOf(name) > -1) {
      setLayout({
        ...layout,

        areas: {
          ...layout.areas,
          [name]: {
            ...layout.areas[name],
            layout: {
              ...layout.areas[name].layout,
              [change.property]: change.value,
            },
          },
        },
      });
    } else {
      setLayout({
        ...layout,
        views: [
          ...layout.views.slice(0, viewIndex),
          view,
          ...layout.views.slice(viewIndex + 1),
        ],
      });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Styled.App>
        <Styled.Side open={open}>
          <Side open={open} toggle={() => setOpen(!open)} />
        </Styled.Side>
        <Styled.Page>
          <span onClick={() => setCurrentView('home')}>Home</span>
          <span onClick={() => setCurrentView('about')}>About</span>
          <h3>View: {capitalize(currentView)}</h3>

          <Board
            currentView={currentView}
            handleAreaChange={handleAreaChange}
            onDrop={handleDrop}
            handleSaveArea={handleSaveArea}
            layout={layout}
          />
        </Styled.Page>
      </Styled.App>
    </DndProvider>
  );
};

export default PageBuilder;
