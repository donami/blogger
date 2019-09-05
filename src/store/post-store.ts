import { observable } from 'mobx';
import { db } from '../fire';
import { Post, CreatePostInput } from '../models/interfaces';

class PostStore {
  @observable posts: any = [];

  constructor() {
    db.collection('posts').onSnapshot(doc => {
      console.log('doc', doc);
      this.posts = doc.docs;
    });
  }

  createPost = async (data: CreatePostInput) => {
    try {
      const docRef = await db.collection('posts').add({
        title: data.title,
        content: data.content,
        categoryId: data.categoryId,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
}

const postStore = new PostStore();
export default postStore;
