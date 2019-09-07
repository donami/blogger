import React, { useState, useEffect } from 'react';
import ItemTypes from './item-types';
import { useDrop } from 'react-dnd';
import styled from 'styled-components/macro';
import { capitalize } from '../../utils';
import Modal from '../modal/modal';
import Icon from '../icon/icon';
import { AreaType } from './types';

type Props = {
  onDrop: any;
  name: string;
  handleSave: (name: string, data: AreaType) => void;
  data: AreaType;
  onAreaLayoutChange: (
    name: string,
    change: {
      property: string;
      value: string | number;
    }
  ) => void;
};
const Area: React.FC<Props> = ({
  onDrop,
  name,
  data,
  handleSave,
  onAreaLayoutChange,
}) => {
  const [components, setComponents] = useState(data.components);

  useEffect(() => {
    setComponents(data.components);
  }, [data, data.components]);

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

  const handleAreaLayoutChange = (change: {
    property: string;
    value: string | number;
  }) => {
    onAreaLayoutChange(name, change);
  };

  return (
    <StyledArea ref={drop} layoutWidth={data.layout.width || 12}>
      <AreaDescription>{capitalize(name)}</AreaDescription>
      <Modal
        trigger={
          <EditBtn>
            <Icon icon={['far', 'edit']} />
          </EditBtn>
        }
      >
        <h4>Component Settings</h4>
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
                    })
                  }
                />
              </div>
            );
          })}
        </div>
        <button>Save</button>
      </Modal>

      {components.map((component: any, index: number) => {
        return (
          <GuiComponent layoutWidth={component.layout.width} key={index}>
            <Modal
              trigger={
                <EditBtn>
                  <Icon icon={['far', 'edit']} />
                </EditBtn>
              }
            >
              <h4>Component Settings</h4>
              <div>
                Text in bold: <input type='checkbox' />
                {Object.keys(component.layout).map(key => {
                  return (
                    <div key={key}>
                      <strong>{capitalize(key)}:</strong>{' '}
                      <input
                        type='text'
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

const GuiComponent = styled.div<{ layoutWidth?: number }>`
  border: #ccc 1px dashed;
  color: #555;
  padding: 15px;
  text-align: center;
  position: relative;
  grid-column-start: ${p => p.layoutWidth || 12} span;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 300;
`;

const EditBtn = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: ${p => p.theme.spacing.small};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default Area;
