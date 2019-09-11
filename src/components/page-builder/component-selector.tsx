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
          <WebComponent type='banner' icon='search' />
          <WebComponent type='social' icon='search' />
          <WebComponent type='tag-cloud' icon='search' />
          <WebComponent type='category-list' icon='search' />
          <WebComponent type='article-list' icon='search' />
        </Styled.ComponentSelectorListItems>
      </Styled.ComponentSelectorList>

      <Styled.ComponentSelectorList>
        <h4>Areas</h4>
        <Styled.ComponentSelectorListItems>
          <WebComponent type='area' icon='cube' />
        </Styled.ComponentSelectorListItems>
      </Styled.ComponentSelectorList>
    </Styled.ComponentSelector>
  );
};

export default ComponentSelector;
