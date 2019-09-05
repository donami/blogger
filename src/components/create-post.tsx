import React, { useState } from 'react';
import CategorySelector from './category-selector/category-selector';
import { CreatePostInput } from '../models/interfaces';

type Props = {
  onSubmit: (data: CreatePostInput) => void;
};
const CreatePost: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('-1');
  const handleSubmit = () => {
    if (!categoryId || categoryId === '-1') {
      // TODO: show toast
      console.log('No category selected.');
      return;
    }
    onSubmit({ title, content, categoryId });
  };

  return (
    <div>
      <h3>Create Post</h3>
      <div>
        <label>Title</label>
        <input
          type='text'
          placeholder='Title'
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        <CategorySelector
          onChange={categoryId => {
            setCategoryId(categoryId);
          }}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          placeholder='Content'
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreatePost;
