import React, { useContext } from 'react';
import { Styled } from './page-builder.styles';
import Modal from '../modal/modal';
import Icon from '../icon/icon';
import { capitalize } from '../../utils';
import { BuilderContext } from './builder-context';
import { BuilderStore } from '../../store/builder-store';
import { useDrag } from 'react-dnd';
import ItemTypes from './item-types';

type Props = {
  component: any;
  index: number;
  areaName: string;
};
const GuiComponent: React.FC<Props> = ({ index, areaName, component }) => {
  const store: BuilderStore = useContext(BuilderContext);

  const [{ opacity }, dragRef] = useDrag({
    item: { type: ItemTypes.WebComponent, areaName, componentIndex: index },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const handleChange = (
    componentIndex: number,
    change: {
      type: 'layout' | 'settings';
      property: string;
      value: string | number;
    }
  ) => {
    store.updateComponent(areaName, componentIndex, change);
  };

  const handleSaveComponent = (index: number) => {};

  return (
    <Styled.GuiComponent layoutWidth={component.layout.width} ref={dragRef}>
      <Modal
        trigger={
          <Styled.EditBtn>
            <Icon icon={['far', 'edit']} />
          </Styled.EditBtn>
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
    </Styled.GuiComponent>
  );
};

export default GuiComponent;
