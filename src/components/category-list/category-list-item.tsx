import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  dataId: string;
  data: {
    title: string;
  };
};
const CategoryListItem: React.FC<Props> = ({ dataId, data }) => {
  const { title } = data;
  return (
    <div>
      <Link to={`/categories/${dataId}`}>{title}</Link>
    </div>
  );
};

export default CategoryListItem;
