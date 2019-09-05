import React, { useState } from 'react';
import { Styled } from './page-builder.styles';
import Side from './menu';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './board';

const initialLayout = {
  areas: {
    top: {
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
      components: [],
    },
  },
};

type Props = {};
const PageBuilder: React.FC<Props> = () => {
  const [open, setOpen] = useState(true);
  const [layout, setLayout] = useState<any>(initialLayout);

  const handleDrop = (item: any, area: any) => {
    console.log('handleDrop', item, area);
    setLayout({
      ...layout,
      areas: {
        ...layout.areas,
        [area.name]: {
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
  };

  console.log('state', layout);

  return (
    <DndProvider backend={HTML5Backend}>
      <Styled.App>
        <Styled.Side open={open}>
          <Side open={open} toggle={() => setOpen(!open)} />
        </Styled.Side>
        <Styled.Page>
          <Board onDrop={handleDrop} layout={layout} />
          Drag your content here
        </Styled.Page>
      </Styled.App>
    </DndProvider>
  );
};

export default PageBuilder;
