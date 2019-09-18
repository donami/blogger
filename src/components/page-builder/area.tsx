import React, { useState, useEffect, useContext } from 'react';
import ItemTypes from './item-types';
import { useDrop, useDrag } from 'react-dnd';
import styled from 'styled-components/macro';
import { capitalize } from '../../utils';
import Modal from '../modal/modal';
import Icon from '../icon/icon';
import { AreaType } from './types';
import { BuilderContext } from './builder-context';
import { observer } from 'mobx-react';
import { BuilderStore } from '../../store/builder-store';
import GuiComponent from './gui-component';
import { Styled } from './page-builder.styles';

type Props = {
  onDrop: any;
  name: string;
  data: AreaType;
  onMoveArea?: any;
};
const Area: React.FC<Props> = ({ onDrop, onMoveArea, name, data }) => {
  const store: BuilderStore = useContext(BuilderContext);
  const [newName, setNewName] = useState(name);
  const ref = React.useRef(null);

  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.Area, areaName: name },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const { components, removable } = data;

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: [ItemTypes.WebComponent, ItemTypes.Area],
    drop: item => {
      if (item.type === ItemTypes.WebComponent) {
        onDrop(item, { name });
      } else if (item.type === ItemTypes.Area) {
        onMoveArea && onMoveArea(item, { name });
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const handleAreaLayoutChange = (change: {
    property: string;
    value: string | number;
    type: 'layout';
  }) => {
    store.updateArea(name, change);
  };

  const handleRemoveArea = () => {
    store.removeArea(name);
  };

  dragRef(drop(ref));

  return (
    <StyledArea ref={ref} layoutWidth={data.layout.width || 12}>
      <AreaDescription>{capitalize(name)}</AreaDescription>
      <Modal
        trigger={
          <Styled.EditBtn>
            <Icon icon={['far', 'edit']} />
          </Styled.EditBtn>
        }
      >
        <h4>Area Settings</h4>
        <div>
          Area name:
          <input
            defaultValue={newName}
            onChange={(e: any) => {
              setNewName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              store.updateAreaName(name, newName);
            }}
          >
            Change
          </button>
        </div>
        <div>
          Text in bold: <input type='checkbox' />
          {Object.keys(data.layout).map(key => {
            return (
              <div key={key}>
                <strong>{capitalize(key)}:</strong>{' '}
                <input
                  type='text'
                  defaultValue={(data.layout as any)[key]}
                  onChange={(e: any) =>
                    handleAreaLayoutChange({
                      property: key,
                      value: e.target.value,
                      type: 'layout',
                    })
                  }
                />
              </div>
            );
          })}
        </div>
        <button>Save</button>
        {removable && (
          <button onClick={() => handleRemoveArea()}>Remove area</button>
        )}
      </Modal>

      {components.map((component: any, index: number) => {
        return (
          <GuiComponent
            component={component}
            index={index}
            areaName={name}
            key={index}
          />
        );
      })}
    </StyledArea>
  );
};

const StyledArea = styled.div<{ layoutWidth: number }>`
  border: #555 1px solid;
  transition: all 0.3s ease-in-out;
  grid-column-start: ${p => p.layoutWidth} span;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding: ${p => p.theme.spacing.large};
  position: relative;

  &:hover {
    background: #ccc;
  }
`;

const AreaDescription = styled.span`
  position: absolute;
  top: 0;
  text-transform: uppercase;
  font-weight: 300;
  left: ${p => p.theme.spacing.large};
  padding: ${p => p.theme.spacing.small} 0;
`;

export default observer(Area);
