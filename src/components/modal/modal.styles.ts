import styled from 'styled-components/macro';

const ModalWrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  transform: translateZ(0);
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2.5em 1.5em 1.5em 1.5em;
  background-color: #ffffff;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  @media screen and (min-width: 500px) {
    left: 50%;
    top: 50%;
    height: auto;
    transform: translate(-50%, -50%);
    max-width: 30em;
    max-height: calc(100% - 1em);
  }
`;

const Close = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5em;
  line-height: 1;
  background: #f6f6f7;
  border: 0;
  box-shadow: 0;
  cursor: pointer;

  svg {
    width: 25px;
    height: 25px;
    fill: transparent;
    stroke: black;
    stroke-linecap: round;
    stroke-width: 2;
  }
`;
const Body = styled.div`
  padding-top: 0.25em;
`;
const CloseButton = styled.span`
  /* border: 0 !important;
  clip: rect(0 0 0 0) !important;
  height: 1px !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  width: 1px !important;
  white-space: nowrap !important; */
`;

const ScrollLock = styled.div`
  overflow: hidden;
  margin-right: 17px;
`;

const Modal = styled.div``;

export const Styled = {
  Modal,
  ModalWrapper,
  ModalArea,
  Close,
  Body,
  CloseButton,
  ScrollLock,
};
