import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import Area from './area';
import { Layout } from './types';
import { observer } from 'mobx-react';
import { BuilderContext } from './builder-context';
import { BuilderStore } from '../../store/builder-store';

type Props = {
  onDrop: any;
  currentView: string;
  layout: Layout;
};

const Board: React.FC<Props> = ({ onDrop, currentView, layout }) => {
  const store: BuilderStore = useContext(BuilderContext);

  const view = layout.views.find(view => view.name === currentView);

  const handleMoveArea = (item: any, area: any) => {
    const { areaName: hoverAreaName } = item;
    if (view && view.areas[hoverAreaName] && view.areas[area.name]) {
      const areaKeys = Object.keys(view.areas);
      const index = areaKeys.indexOf(area.name);
      const hoverIndex = areaKeys.indexOf(hoverAreaName);

      areaKeys[index] = hoverAreaName;
      areaKeys[hoverIndex] = area.name;

      store.moveArea(view.name, areaKeys);
    }
  };

  return (
    <StyledBoard>
      {layout.areas.top && (
        <Area name="top" data={layout.areas.top} onDrop={onDrop} />
      )}

      {view &&
        Object.keys(view.areas).map(key => {
          return (
            <Area
              name={key}
              data={view.areas[key]}
              key={key}
              onDrop={onDrop}
              onMoveArea={handleMoveArea}
            />
          );
        })}

      {layout.areas.bottom && (
        <Area name="bottom" data={layout.areas.bottom} onDrop={onDrop} />
      )}
    </StyledBoard>
  );
};

export default observer(Board);

const StyledBoard = styled.div`
  height: 400px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: ${p => p.theme.spacing.normal};
  grid-row-gap: ${p => p.theme.spacing.normal};
`;
