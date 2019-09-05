import React, { useContext } from 'react';
import { Styled } from './category-list.styles';
import { AppContext } from '../../context/app-context';
import { observer } from 'mobx-react';
import CategoryListItem from './category-list-item';

type Props = {};
const CategoryList: React.FC<Props> = () => {
  const { categoryStore } = useContext(AppContext);

  return (
    <Styled.CategoryList>
      <h3>CategoryList</h3>

      {categoryStore.categories.map((doc: any) => (
        <CategoryListItem key={doc.id} dataId={doc.id} data={doc.data()} />
      ))}
    </Styled.CategoryList>
  );
};

export default observer(CategoryList);
