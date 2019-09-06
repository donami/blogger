import React, { useState } from 'react';
import { Styled } from './page-builder.styles';
import Side from './menu';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './board';
import { DraggableItem } from './item-types';
import { Layout, AreaType } from './types';

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
};

type Props = {};
const PageBuilder: React.FC<Props> = () => {
  const [open, setOpen] = useState(true);
  const [layout, setLayout] = useState<any>(initialLayout);

  const handleDrop = (item: DraggableItem, area: any) => {
    if (item.componentType === 'area') {
      setLayout({
        ...layout,
        areas: {
          ...layout.areas,
          untitled: {
            name: 'untitled-area',
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
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Styled.App>
        <Styled.Side open={open}>
          <Side open={open} toggle={() => setOpen(!open)} />
        </Styled.Side>
        <Styled.Page>
          <Board
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
