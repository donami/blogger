import React, { useState } from 'react';

type Props = {
  onSubmit: (data: any) => void;
};
const CreateCategory: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const handleSubmit = () => {
    onSubmit({ title });
  };

  return (
    <div>
      <h3>Create Category</h3>
      <div>
        <label>Title</label>
        <input
          type='text'
          placeholder='Title'
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};

export default CreateCategory;
