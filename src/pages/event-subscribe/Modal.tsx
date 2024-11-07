import styled from "@emotion/styled";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal(props: Props) {
  const { children, onClose } = props;

  return (
    <MaskContainer>
      <ModalContainer>
        <CloseIcon onClick={onClose}>x</CloseIcon>
        <Body>{children}</Body>
      </ModalContainer>
    </MaskContainer>
  );
}

const MaskContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.69);
  z-index: 10;
`;

const ModalContainer = styled.div`
  position: absolute;
  max-width: 460px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 5px;
  max-height: 90vh;
`;

const CloseIcon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  line-height: 18px;
  top: 8px;
  right: 11px;
  cursor: pointer;
  color: rgb(153, 153, 153);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 17px 50px;
`;
