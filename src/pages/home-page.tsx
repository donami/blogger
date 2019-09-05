import React from 'react';
import DefaultLayout from '../components/layout/default-layout';

type Props = {};
const HomePage: React.FC<Props> = () => {
  return (
    <DefaultLayout>
      <h1>Home</h1>
    </DefaultLayout>
  );
};

export default HomePage;
