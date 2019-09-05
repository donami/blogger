import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../pages/home-page';
import HelpPage from '../pages/help-page';
import CategoryPage from '../pages/category-page';
import PostPage from '../pages/post-page';
import LayoutPage from '../pages/layout-page';

type Props = {};
const RouterOutlet: React.FC<Props> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={HomePage} exact path={'/'} />
        <Route component={HelpPage} path={'/help'} />
        <Route component={LayoutPage} path={'/layout'} />
        <Route component={PostPage} path={'/posts'} />
        <Route component={CategoryPage} path={'/categories/:id?'} />
      </Switch>
    </BrowserRouter>
  );
};

export default RouterOutlet;
