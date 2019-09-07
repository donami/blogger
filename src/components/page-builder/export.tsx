import React, { useContext } from 'react';
import Modal from '../modal/modal';
import { BuilderContext } from './builder-context';
import { BuilderStore } from '../../store/builder-store';
import { observer } from 'mobx-react';

type Props = {};
const Export: React.FC<Props> = () => {
  const store: BuilderStore = useContext(BuilderContext);

  console.log(store);
  return (
    <Modal trigger={<div>Export</div>}>
      <pre>{JSON.stringify(store.layout, null, 2)}</pre>
    </Modal>
  );
};

export default observer(Export);
