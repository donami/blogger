import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { MessageContext } from '../context/message-context';

type Props = {};
const Header: React.FC<Props> = () => {
  const state = useContext(MessageContext);
  console.log('state', state.messages.map(item => item));
  return (
    <div>
      <h1>Header</h1>
      {state.messages.map((item: any) => {
        const { content } = item.data();
        console.log('item', item);
        return <div key={item.id}>{content}</div>;
      })}

      <button onClick={() => state.addMessage('dynamic')}>Add message</button>
    </div>
  );
};

export default observer(Header);
