import React from 'react';
import { Styled } from './page-builder.styles';
import { useDrag } from 'react-dnd';
import ItemTypes from './item-types';
import { capitalize } from '../../utils';
import Icon from '../icon/icon';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  type: string;
  icon: IconProp;
};
const WebComponent: React.FC<Props> = ({ type, icon }) => {
  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.WebComponent, componentType: type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <Styled.ComponentSelectorListItem
      ref={dragRef}
      style={{ opacity: opacity }}
    >
      <span>
        <Icon icon={icon} size='lg' />
      </span>
      <span>{capitalize(type)}</span>
    </Styled.ComponentSelectorListItem>
  );
};

export default WebComponent;
