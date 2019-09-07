import React from 'react';
import DefaultLayout from '../components/layout/default-layout';
import PageBuilder from '../components/page-builder/page-builder';
import builderStore from '../store/builder-store';

type Props = {};
const LayoutPage: React.FC<Props> = () => {
  return (
    <DefaultLayout>
      <PageBuilder store={builderStore} />
    </DefaultLayout>
  );
};

export default LayoutPage;
