import { observable } from 'mobx';
import { db } from '../fire';

type CreateCategoryInput = {
  title: string;
};

class CategoryStore {
  @observable categories: any = [];

  constructor() {
    db.collection('categories').onSnapshot(doc => {
      this.categories = doc.docs;
    });
  }

  getById = (id: string) => {
    return db
      .collection('categories')
      .doc(id)
      .get();
  };

  createCategory = async (data: CreateCategoryInput) => {
    try {
      const docRef = await db.collection('categories').add({
        title: data.title,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };
}

const categoryStore = new CategoryStore();
export default categoryStore;
