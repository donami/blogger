import React from 'react';
import { createPortal } from 'react-dom';
import { Styled } from './modal.styles';

type Props = {
  handleClose: () => void;
};
const ModalContent: React.FC<Props> = ({ handleClose, children }) => {
  return createPortal(
    <Styled.ModalWrapper>
      <Styled.ModalArea>
        <Styled.Close>
          <Styled.CloseButton id="close-modal" onClick={handleClose}>
            Close
          </Styled.CloseButton>
          {/* <svg viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg> */}
        </Styled.Close>
        <Styled.Body>{children}</Styled.Body>
      </Styled.ModalArea>
    </Styled.ModalWrapper>,
    document.body
  );
};

export default ModalContent;
