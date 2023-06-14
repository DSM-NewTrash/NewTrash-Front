import styled from "styled-components";
import { useRecoilState } from "recoil";
import { solveResult } from "../../store/atom";
import { useQuery } from "react-query";
import { getSolveProblem } from "../../utils/api/problem";
import { useApiError } from "../../hooks/useApiError";

const OXObject = [
  { name: "O", value: 1 },
  { name: "X", value: 0 },
];

const SolveProblem = () => {
  const [resultState, setResultState] = useRecoilState(solveResult);

  const { handleError } = useApiError();

  const { data: solve } = useQuery(
    "solve",
    () => getSolveProblem(resultState.problemId),
    {
      onError: handleError,
    }
  );

  return (
    <Wrapper>
      {solve?.data.problemResponses.map((item, idx) =>
        item.form === "MULTIPLE_CHOICE_QUIZ" ? (
          <div>
            <InputBox>
              <ProblemHead>
                <p>문제</p>
                <p>{idx + 1}/20</p>
              </ProblemHead>
              <InputContainer>
                <InputWrapper>
                  <h1>{item.question}</h1>
                  <ImgInputWrapper>
                    <img src={item.image} alt="" />
                  </ImgInputWrapper>
                </InputWrapper>
                <AnswerInputContainer>
                  <p>정답</p>
                  <FourAnswerInputContainer>
                    {item.answers.map((answerItem, idx) => (
                      <FourAnswerInput
                        className={
                          item.correctAnswer === answerItem.id ? "selected" : ""
                        }
                        key={answerItem.id}
                      >
                        <div className="circle">{idx + 1}</div>
                        <FourAnswerBox className="box">
                          {answerItem.answer}
                        </FourAnswerBox>
                      </FourAnswerInput>
                    ))}
                  </FourAnswerInputContainer>
                </AnswerInputContainer>
                <SolveContent>
                  <p className="title">풀이</p>
                  <p className="solve">{item.explanation}</p>
                </SolveContent>
              </InputContainer>
            </InputBox>
          </div>
        ) : (
          <div>
            <InputBox>
              <ProblemHead>
                <p>문제</p>
                <p>{idx + 1}/20</p>
              </ProblemHead>
              <InputContainer>
                <OXInputWrapper>
                  <h1>{item.question}</h1>
                  <ImgInputWrapper>
                    <img src={item.image} alt="" />
                  </ImgInputWrapper>
                </OXInputWrapper>
                <AnswerInputContainer>
                  <p>정답</p>
                  <FourAnswerInputContainer>
                    {OXObject.map((ox, idx) => {
                      console.log(idx, item.correctAnswer, ox.value, "1");
                      return (
                        <OXAnswerContainer key={ox.name}>
                          <button
                            className={
                              item.correctAnswer === ox.value ? "selected" : ""
                            }
                          >
                            {ox.name}
                          </button>
                        </OXAnswerContainer>
                      );
                    })}
                  </FourAnswerInputContainer>
                </AnswerInputContainer>
                <SolveContent>
                  <p className="title">풀이</p>
                  <p className="solve">{item.explanation}</p>
                </SolveContent>
              </InputContainer>
            </InputBox>
          </div>
        )
      )}
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
  width: 1150px;
  height: 850px;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 22px;
  padding: 40px 55px 40px 55px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
`;

const ProblemHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  > p {
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
    font-size: 22px;
    font-weight: 400;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 44px;

  > h1 {
    font-weight: 400;
    font-size: 26px;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const OXInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 80px;

  > h1 {
    font-weight: 400;
    font-size: 26px;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const ImgInputWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  > img {
    height: 350px;
  }
`;

const AnswerInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  > p {
    font-weight: 400;
    font-size: 22px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
`;

const FourAnswerInputContainer = styled.div`
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const FourAnswerInput = styled.div`
  width: 505px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grayScale.Gray};
    font-size: 22px;
    font-weight: 400;
  }

  &.selected {
    .circle {
      color: ${({ theme }) => theme.colors.greanScale.main};
      border-color: ${({ theme }) => theme.colors.greanScale.main};
    }

    .box {
      border-color: ${({ theme }) => theme.colors.greanScale.main};
      background-color: #e3f4e1;
    }
  }
`;

const FourAnswerBox = styled.div`
  width: 420px;
  height: 50px;
  padding: 15px 24px;
  border-radius: 18px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 400;
`;

const OXAnswerContainer = styled.div`
  width: 505px;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
  > button {
    width: 505px;
    height: 70px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    background-color: ${({ theme }) => theme.colors.white};
    font-size: 24px;
    font-weight: 400;
    border-radius: 18px;

    &.selected {
      border-color: ${({ theme }) => theme.colors.greanScale.main};
      background-color: #e3f4e1;
    }
  }
`;

const SolveContent = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  .title {
    font-weight: 400;
    font-size: 22px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
    margin-bottom: 12px;
  }

  .solve {
    font-weight: 400;
    font-size: 22px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default SolveProblem;
