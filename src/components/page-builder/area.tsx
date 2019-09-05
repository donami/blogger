import React, { useState } from 'react';
import ItemTypes from './item-types';
import { useDrop } from 'react-dnd';
import styled from 'styled-components/macro';
import { capitalize } from '../../utils';
import Modal from '../modal/modal';

export type AreaData = {
  components: any[];
};
type Props = {
  onDrop: any;
  name: string;
  handleSave: (name: string, data: AreaData) => void;
  data: AreaData;
};
const Area: React.FC<Props> = ({ onDrop, name, data, handleSave }) => {
  const [components, setComponents] = useState(data.components);

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

  const handleSaveComponent = (index: number) => {
    handleSave(name, {
      ...data,
      components,
    });
  };

  const handleChange = (
    componentIndex: number,
    change: {
      type: 'layout' | 'settings';
      property: string;
      value: string | number;
    }
  ) => {
    const component = {
      ...components[componentIndex],
      [change.type]: {
        ...components[componentIndex][change.type],
        [change.property]: change.value,
      },
    };
    setComponents([
      ...components.slice(0, componentIndex),
      component,
      ...components.slice(componentIndex + 1),
    ]);
  };

  return (
    <StyledArea ref={drop}>
      {components.map((component: any, index: number) => {
        return (
          <GuiComponent key={index}>
            <Modal trigger={<EditComponentBtn>Edit</EditComponentBtn>}>
              <h4>Component Settings</h4>
              <div>
                Text in bold: <input type="checkbox" />
                {Object.keys(component.layout).map(key => {
                  return (
                    <div key={key}>
                      <strong>{capitalize(key)}:</strong>{' '}
                      <input
                        type="text"
                        defaultValue={component.layout[key]}
                        onChange={(e: any) =>
                          handleChange(index, {
                            type: 'layout',
                            property: key,
                            value: e.target.value,
                          })
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <button onClick={() => handleSaveComponent(index)}>Save</button>
            </Modal>
            {capitalize(component.component)}
          </GuiComponent>
        );
      })}
    </StyledArea>
  );
};

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
  position: relative;
`;

const EditComponentBtn = styled.span`
  position: absolute;
  top: 0;
  right: 0;
`;

export default Area;
