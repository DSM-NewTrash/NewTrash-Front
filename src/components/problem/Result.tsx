import styled from "styled-components";
import StarLating from "../common/StarLating";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { solveResult } from "../../store/atom";

const ProblemResult = () => {
  const [resultState, setResultState] = useRecoilState(solveResult);

  console.log(resultState.problemCount);

  return (
    <Wrapper>
      <InputBox>
        <TitleText>
          {resultState.problemCount}문제 중 {resultState.correctAnswerCount}
          문제를 맞추셨습니다:&#41;
        </TitleText>
        <PointText>
          포인트:{resultState.point}P 경험치:{resultState.exp}EXP
        </PointText>
        <StarLating Input={true} star_lating={5} />
        <EvaluationText>이 문제집을 평가해주세요</EvaluationText>
        <BtnWrapper>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/quizs/solve`}
          >
            <CancellButton>전체 풀이 보기</CancellButton>
          </Link>
          <Link style={{ textDecoration: "none", color: "black" }} to={`/`}>
            <NextButton>홈으로 가기</NextButton>
          </Link>
        </BtnWrapper>
      </InputBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1150px;
  height: 700px;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 22px;
  padding: 40px 55px 40px 55px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
`;

const TitleText = styled.h1`
  margin-top: 100px;
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
`;

const PointText = styled.p`
  color: #684df0;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 70px;
`;

const EvaluationText = styled.p`
  margin-top: 20px;
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.TextColor};
`;

const BtnWrapper = styled.div`
  margin-top: 40px;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CancellButton = styled.button`
  cursor: pointer;
  width: 450px;
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
  width: 450px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

export default ProblemResult;
