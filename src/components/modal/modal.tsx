import React, { useState } from 'react';
import ModalContent from './modal-content';

type Props = {
  trigger: React.ReactElement;
};
const Modal: React.FC<Props> = ({ trigger, children }) => {
  const [display, setDisplay] = useState(false);

  const triggerElem = React.cloneElement(trigger, {
    onClick: () => setDisplay(!display),
  });

  return (
    <React.Fragment>
      {triggerElem}
      {display && (
        <ModalContent
          handleClose={() => {
            setDisplay(false);
          }}
        >
          {children}
        </ModalContent>
      )}
    </React.Fragment>
  );
};

export default Modal;
