import React from 'react';
import { MessageContextProvider } from './context/message-context';
import RouterOutlet from './components/router-outlet';
import GlobalStyle from './theme/global-style';
import { ThemeProvider } from 'styled-components';
import theme from './theme/default-theme';
import { AppContextProvider } from './context/app-context';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faSearch,
  faSave,
  faCube,
  faTrash,
  faArrowCircleLeft,
  faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import { faBell, faEdit } from '@fortawesome/free-regular-svg-icons';

library.add(
  faSearch,
  faBell,
  faSave,
  faTrash,
  faCube,
  faEdit,
  faArrowCircleLeft,
  faArrowCircleRight
);

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <MessageContextProvider>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            <RouterOutlet />
          </>
        </ThemeProvider>
      </MessageContextProvider>
    </AppContextProvider>
  );
};

export default App;
