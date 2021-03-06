import styled from 'styled-components/macro';

const mainMenuWidth = '120px';
const sideMenuWidth = '500px'; // 300px

const App = styled.div`
  display: flex;
  min-height: 600px;
`;
const Side = styled.div<{ open: boolean }>`
  flex: 1;
  max-width: ${p => (p.open ? sideMenuWidth : mainMenuWidth)};
`;
const Page = styled.div`
  flex: 1;
  padding: 40px ${p => p.theme.spacing.normal};
  border: #eee 1px solid;
  text-align: center;
`;

const Menu = styled.div`
  background: #212127;
  position: relative;
  color: #bec3c8;
  height: 100%;

  a {
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #fff;
    }
  }
`;
const MenuContent = styled.div`
  display: flex;
  height: 100%;
`;
const MainMenu = styled.div`
  flex: 1;
  min-width: ${mainMenuWidth};
  max-width: ${mainMenuWidth};
  padding: ${p => p.theme.spacing.normal};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  li {
    margin-bottom: ${p => p.theme.spacing.normal};
  }
`;
const BottomActions = styled.div``;

const BottomAction = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.9em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-bottom: ${p => p.theme.spacing.normal};

  &:last-child {
    margin-bottom: 0;
  }
  span,
  i,
  svg {
    display: block;
    margin-bottom: 5px;
  }

  &:hover {
    color: #fff;
  }
`;

const Tools = styled.div`
  flex: 1;
  background: purple;
  padding: 40px ${p => p.theme.spacing.normal};
  background-color: #f3f3f3;
  color: #53595f;

  h1,
  h2,
  h3,
  h4 {
    font-weight: 400;
    margin-bottom: ${p => p.theme.spacing.normal};
  }
`;
const Expand = styled.div`
  position: absolute;
  padding: ${p => p.theme.spacing.small};
  top: 0;
  left: ${mainMenuWidth};
  background-color: #35353a;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

const ComponentSelector = styled.div``;
const ComponentSelectorList = styled.div`
  margin-bottom: ${p => p.theme.spacing.large};
`;
const ComponentSelectorListItems = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 12.5px;

  @media screen and (max-width: 1070px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const ComponentSelectorListItem = styled.div`
  border: #e8e8e8 1px solid;
  background: #fff;
  border-radius: 3px;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.8em;

  &:hover {
    color: #3666e4;
  }

  span {
    display: block;
    text-align: center;
    padding: 5px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
  }
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

export const Styled = {
  App,
  Side,
  Page,
  Menu,
  MenuContent,
  MainMenu,
  BottomActions,
  BottomAction,
  Tools,
  Expand,
  ComponentSelector,
  ComponentSelectorList,
  ComponentSelectorListItems,
  ComponentSelectorListItem,
  GuiComponent,
  EditBtn,
};
