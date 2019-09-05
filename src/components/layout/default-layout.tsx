import React from 'react';
import styled from 'styled-components/macro';
import Sidebar from '../sidebar/sidebar';
import Icon from '../icon/icon';

type Props = {};
const DefaultLayout: React.FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Left>
        <Sidebar />
      </Left>
      <Right>
        <TopMenu>
          <Search>
            <Icon icon='search' size='lg' />
          </Search>
          <Notifications>
            <Icon icon={['far', 'bell']} size='lg' />
          </Notifications>
          <ProfileImage>
            <img
              src='https://dq1eylutsoz4u.cloudfront.net/2017/10/06151308/short-dating-profile-examples.jpg'
              alt='Profile image'
            />
          </ProfileImage>
        </TopMenu>
        <Content>{children}</Content>
      </Right>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  min-height: 100%;
  flex: 1;
`;
const Left = styled.div`
  flex: 1;
  min-width: 220px;
  max-width: 220px;
  min-height: 100%;
`;
const Right = styled.div`
  flex: 1;
`;
const Content = styled.div`
  padding: ${p => p.theme.spacing.large};
`;
const TopMenu = styled.div`
  padding: ${p => p.theme.spacing.large};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #999;
`;
const ProfileImage = styled.div`
  padding: 0 ${p => p.theme.spacing.normal};

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;
const Notifications = styled.div`
  padding: 0 ${p => p.theme.spacing.normal};
`;
const Search = styled.div`
  /* width: 120px; */
  padding: 0 ${p => p.theme.spacing.normal};
`;

export default DefaultLayout;
