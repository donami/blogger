import React from 'react';
import styled from 'styled-components/macro';
import Area from './area';
import { AreaType } from './types';

type Props = {
  onDrop: any;
  layout: any;
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
  layout,
  handleSaveArea,
  handleAreaChange,
}) => {
  return (
    <StyledBoard>
      {Object.keys(layout.areas).map(key => {
        return (
          <Area
            name={key}
            onAreaLayoutChange={handleAreaChange}
            data={layout.areas[key]}
            key={key}
            handleSave={handleSaveArea}
            onDrop={onDrop}
          />
        );
      })}
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
