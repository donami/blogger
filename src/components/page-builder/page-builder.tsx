import React, { useState } from 'react';
import { Styled } from './page-builder.styles';
import Side from './menu';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './board';
import { DraggableItem } from './item-types';
import { Layout, AreaType } from './types';
import { capitalize } from '../../utils';
import { BuilderStore } from '../../store/builder-store';
import { observer } from 'mobx-react';
import { BuilderContext } from './builder-context';
import Export from './export';

// const initialLayout: Layout = {
//   areas: {
//     top: {
//       layout: {
//         width: 12,
//       },
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

type Props = {
  store: BuilderStore;
};
const PageBuilder: React.FC<Props> = ({ store }) => {
  const [open, setOpen] = useState(true);

  const [currentView, setCurrentView] = useState('home');

  const handleDrop = (item: DraggableItem, area: any) => {
    if (item.componentType === 'area') {
      if (['top', 'bottom'].indexOf(area.name) === -1) {
        store.addArea(
          'untitled',
          {
            components: [],
            layout: {
              width: 12,
            },
          },
          currentView
        );
      }
    } else {
      store.addComponent(
        {
          component: item.componentType,
          layout: {
            width: 12,
          },
          settings: {},
        },
        area.name
      );
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <BuilderContext.Provider value={store}>
        <Styled.App>
          <Styled.Side open={open}>
            <Side open={open} toggle={() => setOpen(!open)} />
          </Styled.Side>
          <Styled.Page>
            <Export />
            <span onClick={() => setCurrentView('home')}>Home</span>
            <span onClick={() => setCurrentView('about')}>About</span>
            <h3>View: {capitalize(currentView)}</h3>

            <Board
              currentView={currentView}
              onDrop={handleDrop}
              layout={store.layout}
            />
          </Styled.Page>
        </Styled.App>
      </BuilderContext.Provider>
    </DndProvider>
  );
};

export default observer(PageBuilder);
