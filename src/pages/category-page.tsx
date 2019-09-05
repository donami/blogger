import React, { useContext } from 'react';
import DefaultLayout from '../components/layout/default-layout';
import { AppContext } from '../context/app-context';
import CreateCategory from '../components/create-category';
import CategoryList from '../components/category-list/category-list';
import { Switch, Route } from 'react-router';
import CategoryView from '../components/category-view/category-view';

type Props = {};
const CategoryPage: React.FC<Props> = () => {
  const { categoryStore } = useContext(AppContext);

  const handleCreateCategory = async (data: any) => {
    await categoryStore.createCategory(data);
  };

  return (
    <DefaultLayout>
      <Switch>
        <Route path='/categories/:id' component={CategoryView} />
        <Route
          path='/categories'
          render={() => (
            <>
              Category page
              <CreateCategory onSubmit={handleCreateCategory} />
              <CategoryList />
            </>
          )}
        />
      </Switch>
    </DefaultLayout>
  );
};

export default CategoryPage;
