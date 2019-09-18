import React, { useContext } from 'react';
import Icon from '../icon/icon';
import { useDrop } from 'react-dnd';
import ItemTypes from './item-types';
import { Styled } from './page-builder.styles';
import { observer } from 'mobx-react';
import { BuilderStore } from '../../store/builder-store';
import { BuilderContext } from './builder-context';

type Props = {};
const Trash: React.FC<Props> = () => {
  const store: BuilderStore = useContext(BuilderContext);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.WebComponent, ItemTypes.Area],
    drop: (item: any) => {
      if (item.areaName) {
        if (item.type === ItemTypes.WebComponent) {
          store.removeComponent(item.areaName, item.componentIndex);
        } else if (item.type === ItemTypes.Area) {
          store.removeArea(item.areaName);
        }
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <Styled.BottomAction ref={drop}>
      <Icon icon='trash' size='2x' />
      <span>Remove</span>
    </Styled.BottomAction>
  );
};

export default observer(Trash);
