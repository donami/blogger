import React from 'react';
import styled from 'styled-components/macro';
import Area from './area';
import { AreaType, Layout } from './types';

type Props = {
  onDrop: any;
  currentView: string;
  layout: Layout;
  handleSaveArea: (name: string, data: AreaType) => void;
  handleAreaChange: (
    name: string,
    change: {
      property: string;
      value: string | number;
    }
  ) => void;
};

const Board: React.FC<Props> = ({
  onDrop,
  currentView,
  layout,
  handleSaveArea,
  handleAreaChange,
}) => {
  const view = layout.views.find(view => view.name === currentView);

  return (
    <StyledBoard>
      {layout.areas.top && (
        <Area
          name='top'
          onAreaLayoutChange={handleAreaChange}
          data={layout.areas.top}
          handleSave={handleSaveArea}
          onDrop={onDrop}
        />
      )}

      {view &&
        Object.keys(view.areas).map(key => {
          return (
            <Area
              name={key}
              onAreaLayoutChange={handleAreaChange}
              data={view.areas[key]}
              key={key}
              handleSave={handleSaveArea}
              onDrop={onDrop}
            />
          );
        })}

      {layout.areas.bottom && (
        <Area
          name='bottom'
          onAreaLayoutChange={handleAreaChange}
          data={layout.areas.bottom}
          handleSave={handleSaveArea}
          onDrop={onDrop}
        />
      )}
    </StyledBoard>
  );
};

export default Board;

const StyledBoard = styled.div`
  height: 400px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: ${p => p.theme.spacing.normal};
  grid-row-gap: ${p => p.theme.spacing.normal};
`;
