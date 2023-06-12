import { useState } from "react";
import styled from "styled-components";
import { useApiError } from "../../hooks/useApiError";
import { useQuery } from "react-query";
import { getProblemSolution } from "../../utils/api/problem";
import { useParams } from "react-router-dom";
import heart from "../../assets/heart.svg";
import RemainModal from "./RemainModal";

const Problem = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(true);

  let { id } = useParams();
  const QUIZ_ID = String(id);

  const { handleError } = useApiError();

  const { data: problem } = useQuery(
    "problem",
    () => getProblemSolution(QUIZ_ID),
    {
      onError: handleError,
    }
  );

  console.log(problem?.data);

  return (
    <Wrapper>
      {problem?.data.problemResponses.map((item, idx) =>
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
                  <p>답 선택</p>
                  <FourAnswerInputContainer>
                    {item.answers.map((answerItem, idx) => (
                      <FourAnswerInput key={answerItem.id}>
                        <div className="circle">{idx + 1}</div>
                        <FourAnswerBox>{answerItem.answer}</FourAnswerBox>
                      </FourAnswerInput>
                    ))}
                  </FourAnswerInputContainer>
                </AnswerInputContainer>
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
                  <p>답 선택</p>
                  <FourAnswerInputContainer>
                    <OXAnswerContainer>
                      <button>O</button>
                    </OXAnswerContainer>
                    <OXAnswerContainer>
                      <button>X</button>
                    </OXAnswerContainer>
                  </FourAnswerInputContainer>
                </AnswerInputContainer>
              </InputContainer>
            </InputBox>
          </div>
        )
      )}
      <SubmitBox>
        <img src={heart} alt="" />
        <p>모두 완료 되었습니다! 채점 할 준비 되었나요?</p>
        <SubmitBtn>제출하기</SubmitBtn>
      </SubmitBox>
      {modalOpen && <RemainModal problem={3} setModalState={setModalOpen} />}
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
  height: 750px;
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
  cursor: pointer;
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
    cursor: pointer;
    width: 505px;
    height: 70px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    background-color: ${({ theme }) => theme.colors.white};
    font-size: 24px;
    font-weight: 400;
    border-radius: 18px;
  }
`;

const SubmitBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1150px;
  height: 750px;
  margin-top: 60px;
  margin-bottom: 60px;

  > img {
    margin-bottom: 20px;
  }

  > p {
    font-weight: 400;
    font-size: 32px;
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 20px;
  }
`;

const SubmitBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 350px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};
  font-size: 20px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

export default Problem;
