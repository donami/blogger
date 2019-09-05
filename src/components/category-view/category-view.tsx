import React, { useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

import { AppContext } from '../../context/app-context';
import NotFound from '../not-found/not-found';
import Loader from '../loader/loader';

type Props = {} & RouteComponentProps<{ id: string }>;
const CategoryView: React.FC<Props> = ({ match }) => {
  const [category, setCategory] = useState<any>(undefined);
  const { categoryStore } = useContext(AppContext);

  useEffect(() => {
    categoryStore.getById(match.params.id).then(doc => {
      setCategory(doc);
    });
  }, []);

  if (category) {
    if (category.exists) {
      const { title } = category.data();
      return <div>{title}</div>;
    }
    return <NotFound />;
  }

  return <Loader />;
};

export default CategoryView;
