import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import { AppContext } from '../../context/app-context';

type Props = {
  onChange: (category: any) => void;
};
const CategorySelector: React.FC<Props> = ({ onChange }) => {
  const { categoryStore } = useContext(AppContext);

  const handleChange = (e: any) => {
    onChange(e.target.value);
  };

  return (
    <select onChange={handleChange}>
      <option value='-1'>Select category</option>
      {categoryStore.categories.map((doc: any) => (
        <option key={doc.id} value={doc.id}>
          {doc.data().title}
        </option>
      ))}
    </select>
  );
};

export default observer(CategorySelector);
