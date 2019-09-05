import React from 'react';
import messageState from '../store/messages-state';
import categoryStore from '../store/category-store';
import postStore from '../store/post-store';
import { observer } from 'mobx-react';

export const AppContext = React.createContext({
  messages: [],
  addMessage: messageState.addMessage,
  postStore,
  categoryStore,
});

type Props = {};
export const AppContextProvider: React.FC<Props> = observer(({ children }) => {
  return (
    <AppContext.Provider
      value={{
        messages: [],
        addMessage: messageState.addMessage,
        postStore,
        categoryStore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
});
