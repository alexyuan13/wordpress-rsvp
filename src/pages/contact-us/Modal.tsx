import styled from "@emotion/styled";
import { ReactNode } from "react";
import { mq } from "../../utils/mediaQueries";

type Props = {
  title: string;
  children: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
};

export default function Modal(props: Props) {
  const { title, children, onConfirm, onClose } = props;

  return (
    <MaskContainer>
      <ModalContainer>
        <Header>
          <HeaderText>{title}</HeaderText>
          <CloseIcon onClick={onClose}>x</CloseIcon>
        </Header>
        <Body>
          {children}
          <Button onClick={onConfirm}>OK</Button>
        </Body>
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

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid rgb(136, 136, 136);
`;

const HeaderText = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: 22px;
  text-align: center;
  color: rgb(51, 51, 51);
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
  padding: 25px 23px;
`;

const Button = styled.button(
  mq({
    backgroundColor: "rgb(15,139,141)",
    fontSize: 18,
    minWidth: 140,
    minHeight: 40,
    borderRadius: 26,
    marginTop: 20,
    border: 0,
    color: "#fff",
    fontWeight: "400",
    cursor: "pointer",
    ":disabled": {
      opacity: 0.5,
    },
  })
);
