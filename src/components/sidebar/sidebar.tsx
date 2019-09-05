import React from 'react';
import { Link } from 'react-router-dom';
import { Styled } from './sidebar.styles';

type Props = {};
const Sidebar: React.FC<Props> = () => {
  return (
    <Styled.Wrapper>
      <Styled.LogoWrapper>
        <img
          src='http://eatlogos.com/alphabet_logos/png/f_letter_alphabets_inspiration_vector_logo_design.png'
          alt='Logo'
        />
      </Styled.LogoWrapper>
      <Styled.MenuItem>
        <h3>Main</h3>
        <ul>
          <li>Reports</li>
          <li>Insights</li>
          <li>
            <Link to='/layout'>Appearance</Link>
          </li>
          <li>
            <Link to='/categories'>Categories</Link>
          </li>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>
      </Styled.MenuItem>
      <Styled.MenuItem>
        <h3>Help</h3>
        <ul>
          <li>Settings</li>
          <li>Library</li>
          <li>Support</li>
        </ul>
      </Styled.MenuItem>
    </Styled.Wrapper>
  );
};

export default Sidebar;
