import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './item-types';
import styled from 'styled-components/macro';
import { capitalize } from '../../utils';

type Props = {
  onDrop: any;
  layout: any;
};

const Area: React.FC<{ onDrop: any; name: string }> = ({
  onDrop,
  name,
  children,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.WebComponent,
    drop: item => {
      onDrop(item, { name });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return <StyledArea ref={drop}>{children}</StyledArea>;
};

const Board: React.FC<Props> = ({ onDrop, layout }) => {
  return (
    <StyledBoard>
      {Object.keys(layout.areas).map(key => {
        return (
          <Area name={key} key={key} onDrop={onDrop}>
            {layout.areas[key].components.map(
              (component: any, index: number) => {
                return (
                  <GuiComponent key={index}>
                    {capitalize(component.component)}
                  </GuiComponent>
                );
              }
            )}
          </Area>
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

const StyledArea = styled.div`
  border: purple 1px solid;
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #ccc;
  }
`;

const GuiComponent = styled.div`
  background: blue;
  color: #fff;
  padding: 15px;
  text-align: center;
`;
