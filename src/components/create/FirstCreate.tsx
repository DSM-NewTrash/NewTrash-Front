import { useState } from "react";
import styled from "styled-components";
import { CategoryConstants } from "../constants";

const FirstCreate = () => {
  const [btnState, setBtnState] = useState<boolean>(true);
  const [questionState, setQuestionState] = useState({
    title: "",
    introduction: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setQuestionState({ ...questionState, [name]: value });
    if (questionState.title === "" || questionState.introduction === "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  return (
    <Wrapper>
      <InputContainer>
        <p>문제집명</p>
        <CreateInput
          value={questionState.title}
          name="title"
          onChange={onChangeInput}
          type="text"
          placeholder="문제집명을 입력해주세요"
        />
      </InputContainer>
      <InputContainer>
        <p>문제집 상세 설명</p>
        <CreateInput
          value={questionState.introduction}
          name="introduction"
          onChange={onChangeInput}
          type="text"
          placeholder="문제집에 대한 상세설명을 입력해주세요"
        />
      </InputContainer>
      <CategoryContainer>
        <p>카테고리</p>
        <CategoryList>
          {CategoryConstants.map((item, idx) => (
            <CategoryItem key={idx}>
              <p>{item}</p>
            </CategoryItem>
          ))}
        </CategoryList>
      </CategoryContainer>
      <ButtonContainer>
        <NextButton disabled={btnState}>다음으로</NextButton>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1150px;
  height: 650px;
  gap: 42px;
  padding: 50px 55px 60px 55px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: ${({ theme }) => theme.colors.white};

  > p {
    background-color: ${({ theme }) => theme.colors.white};
    font-weight: 400;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
`;

const CreateInput = styled.input`
  height: 50px;
  padding: 15px 28px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  border-radius: 18px;
  outline: none;
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: ${({ theme }) => theme.colors.white};

  > p {
    background-color: ${({ theme }) => theme.colors.white};
    font-weight: 400;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const CategoryItem = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 20px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  border-radius: 40px;
  background-color: ${({ theme }) => theme.colors.white};

  > p {
    font-weight: 400;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
`;

const ButtonContainer = styled.div`
  margin-top: 29px;
`;

const NextButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};

  :disabled {
    color: ${({ theme }) => theme.colors.greanScale.main};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export default FirstCreate;
