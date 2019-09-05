import React from 'react';
import DefaultLayout from '../components/layout/default-layout';
import PageBuilder from '../components/page-builder/page-builder';

type Props = {};
const LayoutPage: React.FC<Props> = () => {
  return (
    <DefaultLayout>
      <PageBuilder />
    </DefaultLayout>
  );
};

export default LayoutPage;
