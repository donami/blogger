import React from 'react';
import styled from 'styled-components/macro';
import Area, { AreaData } from './area';

type Props = {
  onDrop: any;
  layout: any;
  handleSaveArea: (name: string, data: AreaData) => void;
};

const Board: React.FC<Props> = ({ onDrop, layout, handleSaveArea }) => {
  return (
    <StyledBoard>
      {Object.keys(layout.areas).map(key => {
        return (
          <Area
            name={key}
            data={layout.areas[key]}
            key={key}
            handleSave={handleSaveArea}
            onDrop={onDrop}
          ></Area>
        );
      })}
    </StyledBoard>
  );
};

export default Board;

const StyledBoard = styled.div`
  height: 400px;
  display: grid;
`;
