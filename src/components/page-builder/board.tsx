import React from 'react';
import styled from 'styled-components/macro';
import Area from './area';
import { AreaType, Layout } from './types';

type Props = {
  onDrop: any;
  currentView: string;
  layout: Layout;
};

const Board: React.FC<Props> = ({ onDrop, currentView, layout }) => {
  const view = layout.views.find(view => view.name === currentView);

  return (
    <StyledBoard>
      {layout.areas.top && (
        <Area name='top' data={layout.areas.top} onDrop={onDrop} />
      )}

      {view &&
        Object.keys(view.areas).map(key => {
          return (
            <Area name={key} data={view.areas[key]} key={key} onDrop={onDrop} />
          );
        })}

      {layout.areas.bottom && (
        <Area name='bottom' data={layout.areas.bottom} onDrop={onDrop} />
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
