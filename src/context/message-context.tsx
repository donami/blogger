import React from 'react';
import messageState from '../store/messages-state';
import { observer } from 'mobx-react';

export const MessageContext = React.createContext({ messages: [], addMessage: messageState.addMessage });

type Props = {};
export const MessageContextProvider: React.FC<Props> = observer(({ children }) => {
  return (
    <MessageContext.Provider value={{ messages: messageState.messages, addMessage: messageState.addMessage }}>
      {children}
    </MessageContext.Provider>
  );
});