import { observable } from 'mobx';
import { db } from '../fire';

class MessageState {
  @observable messages: any = [];

  constructor() {
    db.collection('messages').onSnapshot(doc => {
      this.messages = doc.docs;
    });
  }

  addMessage = (message: string) => {
    db.collection('messages')
      .add({
        content: message
      })
      .then(function(docRef) {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  };
}

const messageState = new MessageState();
export default messageState;
