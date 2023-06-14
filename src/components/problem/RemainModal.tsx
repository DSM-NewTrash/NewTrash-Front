import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "react-query";
import { SubmitSolveProblem } from "../../utils/api/problem";
import { useApiError } from "../../hooks/useApiError";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { solveResult } from "../../store/atom";

interface Props {
  problemLength: number;
  id: string;
  answer: any[];
  problem: number;
  setModalState: Dispatch<SetStateAction<boolean>>;
}

const RemainModal = ({
  setModalState,
  problem,
  answer,
  id,
  problemLength,
}: Props) => {
  const [resultState, setResultState] = useRecoilState(solveResult);
  console.log(problemLength);
  const { handleError } = useApiError();

  const { mutate: submit } = useMutation(() => SubmitSolveProblem(answer, id), {
    onError: handleError,
    onSuccess: (res) => {
      setResultState({
        ...resultState,
        problemId: id,
        correctAnswerCount: res.data.correctAnswerCount,
        exp: res.data.exp,
        point: res.data.point,
      });
      console.log(res.data.exp);
    },
  });

  const closeModal = () => {
    setModalState(false);
  };

  const onClickSubmit = () => {
    submit();
  };

  return (
    <ModalWrapper>
      <Wrapper>
        {problem > 0 ? (
          <>
            <h1>{problem}문제를 건너뛰었습니다.</h1>
            <p>건너뛴 문제를 검토할까요? 아니면</p>
            <p className="last">지금 해결한 문제를 제출하시겠습니까?</p>
          </>
        ) : (
          <>
            <h1>문제 풀이가 끝났습니다.</h1>
            <p>문제를 검토할까요? 아니면</p>
            <p className="last">지금 해결한 문제를 제출하시겠습니까?</p>
          </>
        )}

        <BtnWrapper>
          <CancellButton onClick={closeModal}>문제 검토하기</CancellButton>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/quizs/result`}
          >
            <NextButton onClick={onClickSubmit}>
              해결한 문제 제출하기
            </NextButton>
          </Link>
        </BtnWrapper>
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
    font-weight: 400;
    font-size: 30px;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 14px;
  }

  > p {
    font-weight: 400;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.TextColor};
    margin-bottom: 5px;
  }

  .last {
    margin-bottom: 60px;
  }
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CancellButton = styled.button`
  cursor: pointer;
  width: 300px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Light_Gray};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.TextColor};
`;

const NextButton = styled.button`
  cursor: pointer;
  width: 300px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

export default RemainModal;
