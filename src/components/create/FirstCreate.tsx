import { useState } from "react";
import styled from "styled-components";
import { CategoryConstants } from "../constants";
import Uproad from "./Uproad";
import { createQuestion } from "../../store/atom";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";

const FirstCreate = () => {
  const [btnState, setBtnState] = useState<boolean>(true);
  const [state, setState] = useRecoilState(createQuestion);
  const [activetab, setActiveTab] = useState<number>(0);

  const onClickTab = (idx: number, value: string) => {
    setActiveTab(idx);
    setState({ ...state, category: value });
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
    if (
      state.title === "" ||
      state.introduction === "" ||
      state.category === ""
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  const onChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <Wrapper>
      <InputBox>
        <ImgInputWrapper>
          <p>문제집 표지</p>
          <Uproad />
        </ImgInputWrapper>
        <InputWrapper>
          <InputContainer>
            <p>문제집명</p>
            <CreateInput
              value={state.title}
              name="title"
              onChange={onChangeInput}
              type="text"
              placeholder="문제집명을 입력해주세요"
            />
          </InputContainer>
          <InputContainer>
            <p>문제집 상세 설명</p>
            <CreateArea
              value={state.introduction}
              name="introduction"
              onChange={onChangeArea}
              placeholder="문제집에 대한 상세설명을 입력해주세요"
            />
          </InputContainer>
          <CategoryContainer>
            <p>카테고리</p>
            <CategoryList>
              {CategoryConstants.map((item, idx) => (
                <CategoryItem
                  onClick={() => onClickTab(idx, item.value)}
                  isState={activetab === idx}
                  key={idx}
                >
                  <p>{item.name}</p>
                </CategoryItem>
              ))}
            </CategoryList>
          </CategoryContainer>
        </InputWrapper>
      </InputBox>
      <ButtonContainer>
        <Link to="/question-create">
          <NextButton disabled={btnState}>다음으로</NextButton>
        </Link>
      </ButtonContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1150px;
  height: 720px;
  gap: 42px;
  padding: 50px 55px 60px 55px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.white};
`;

const InputWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 42px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ImgInputWrapper = styled.div`
  width: 500px;
  background-color: ${({ theme }) => theme.colors.white};
  > p {
    background-color: ${({ theme }) => theme.colors.white};
    font-weight: 400;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  background-color: ${({ theme }) => theme.colors.white};

  > p {
    margin-top: 5px;
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
  color: ${({ theme }) => theme.colors.TextColor};
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};

  :focus {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const CreateArea = styled.textarea`
  height: 210px;
  padding: 15px 28px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  border-radius: 18px;
  outline: none;
  color: ${({ theme }) => theme.colors.TextColor};
  font-size: 18px;
  resize: none;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};

  :focus {
    background-color: ${({ theme }) => theme.colors.white};
  }
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

const CategoryItem = styled.div<{ isState: boolean }>`
  cursor: pointer;
  width: 110px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid
    ${({ theme, isState }) =>
      isState
        ? theme.colors.greanScale.Light_Grean
        : theme.colors.grayScale.Gray};
  border-radius: 40px;

  > p {
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme, isState }) =>
      isState
        ? theme.colors.greanScale.Light_Grean
        : theme.colors.grayScale.Very_Dark_Gray};
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
