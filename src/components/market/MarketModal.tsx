import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setModalState: Dispatch<SetStateAction<boolean>>;
}

const MarketModal = ({ setModalState }: Props) => {
  const closeModal = () => {
    setModalState(false);
  };

  return (
    <ModalWrapper>
      <Wrapper>
        <h1>PIN 번호</h1>
        <h1>1234-5678-9012-3456</h1>
        <p>한 번 나가시면 저장되지 않으니 이 점 유의해주세요</p>
        <NextButton onClick={closeModal}>확인하기</NextButton>
      </Wrapper>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(33, 33, 33, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 101 !important;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 680px;
  height: 380px;
  padding: 50px 36px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  z-index: 99;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  > h1 {
    margin-bottom: 30px;
    font-weight: 400;
    font-size: 32px;
    color: ${({ theme }) => theme.colors.black};
  }

  > p {
    margin-bottom: 42px;
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.TextColor};
  }
`;

const NextButton = styled.button`
  cursor: pointer;
  width: 600px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

export default MarketModal;
