import React from 'react';
import { Styled } from './page-builder.styles';
import ComponentSelector from './component-selector';
import Icon from '../icon/icon';
import Trash from './trash';

type Props = {
  open: boolean;
  toggle: () => void;
};
const Menu: React.FC<Props> = ({ open, toggle }) => {
  return (
    <Styled.Menu>
      <Styled.Expand onClick={toggle}>
        <Icon icon={open ? 'arrow-circle-left' : 'arrow-circle-right'} />
      </Styled.Expand>
      <Styled.MenuContent>
        <Styled.MainMenu>
          <div>
            <ul>
              <li>Menu</li>
              <li>Blocks</li>
              <li>Layouts</li>
              <li>Library</li>
              <li>Tools</li>
            </ul>
          </div>

          <Styled.BottomActions>
            <Trash />
            <Styled.BottomAction>
              <Icon icon='save' size='2x' />
              <span>Save</span>
            </Styled.BottomAction>
          </Styled.BottomActions>
        </Styled.MainMenu>
        {open && (
          <Styled.Tools>
            <ComponentSelector />
          </Styled.Tools>
        )}
      </Styled.MenuContent>
    </Styled.Menu>
  );
};

export default Menu;
