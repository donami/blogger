// import styled from '../../theme/styled';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  color: #fff;
  background: #353a5d;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  // background: #33395c;
  // background: -moz-linear-gradient(top, #33395c 0%, #2a2d45 100%);
  // background: -webkit-linear-gradient(top, #33395c 0%, #2a2d45 100%);
  // background: linear-gradient(to bottom, #33395c 0%, #2a2d45 100%);
  // filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33395c', endColorstr='#2a2d45',GradientType=0 );
`;

const MenuItem = styled.div`
  align-self: center;
  width: 60%;
  margin-bottom: ${props => props.theme.spacing.huge};

  a {
    color: #fff;
    text-decoration: none;
  }
`;

const LogoWrapper = styled.div`
  text-align: center;

  img {
    max-width: 100%;
  }
`;

export const Styled = {
  Wrapper,
  MenuItem,
  LogoWrapper,
};
