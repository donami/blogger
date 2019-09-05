import React from 'react';
import { Styled } from './page-builder.styles';
import WebComponent from './web-component';

type Props = {};
const ComponentSelector: React.FC<Props> = () => {
  return (
    <Styled.ComponentSelector>
      <Styled.ComponentSelectorList>
        <h4>Default Addons</h4>
        <Styled.ComponentSelectorListItems>
          <WebComponent type='accordion' icon='search' />
          <WebComponent type='button' icon='search' />
          <WebComponent type='icon' icon='search' />
          <WebComponent type='image' icon='search' />
          <WebComponent type='banner' icon='search' />
          <WebComponent type='video' icon='search' />
        </Styled.ComponentSelectorListItems>
      </Styled.ComponentSelectorList>
    </Styled.ComponentSelector>
  );
};

export default ComponentSelector;
