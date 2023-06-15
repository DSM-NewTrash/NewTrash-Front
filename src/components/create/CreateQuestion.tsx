import { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Check from "../../assets/check";
import { createQuestion } from "../../store/atom";
import { useRecoilState } from "recoil";
import React from "react";
import plus from "../../assets/plus.svg";
import { Link } from "react-router-dom";

const InputObject = [
  {
    name: 1,
  },
  {
    name: 2,
  },
  {
    name: 3,
  },
  {
    name: 4,
  },
];

const OXObject = [
  { name: "O", value: 1 },
  { name: "X", value: 0 },
];

const CreateQuestion = () => {
  const [state, setState] = useRecoilState(createQuestion);
  const [btnState, setBtnState] = useState<boolean>(true);
  const [activetab, setActiveTab] = useState<number>(0);
  const [toggleState, setToggleState] = useState<boolean>();
  const [imageSrc, setImageSrc]: any = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const ToggleValue = [
    {
      name: "사지선다형",
      value: "MULTIPLE_CHOICE_QUIZ",
    },
    {
      name: "O/X",
      value: "OX_QUIZ",
    },
  ];

  useEffect(() => {
    const newForm = ToggleValue[activetab].value;
    updateProblemForm(newForm);
    console.log(state);

    if (newForm === "MULTIPLE_CHOICE_QUIZ") {
      setToggleState(true);
    } else {
      setToggleState(false);
    }
  }, [activetab]);

  const updateProblemForm = (newForm: string) => {
    setState((prev) => ({
      ...prev,
      problems: prev.problems.map((problem, index) =>
        index === activetab ? { ...problem, form: newForm } : problem
      ),
    }));
  };

  const onClickTab = (idx: number) => {
    setActiveTab(idx);
  };

  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const { value, name } = e.target;
    const changedProblem = state.problems.map((v) => {
      return v.id === id
        ? {
            ...v,
            [name]: value,
          }
        : v;
    });
    setState({ ...state, problems: changedProblem });
  };

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const addProblem = () => {
    setState({
      ...state,
      problems: [
        ...state.problems,
        {
          id: "",
          form: "",
          path: "",
          question: "",
          correct_answer: 0,
          answers: [],
          explanation: "",
        },
      ],
    });
  };

  return (
    <Wrapper>
      <MenuWrapper>
        {ToggleValue.map((item, idx) => (
          <ToggleDiv key={idx} onClick={() => onClickTab(idx)}>
            <ToggleState isState={activetab === idx}>
              <Check color={activetab === idx} />
            </ToggleState>
            <p>{item.name}</p>
          </ToggleDiv>
        ))}
        <Link style={{ textDecoration: "none", color: "black" }} to={`/`}>
          <NextButton>출제완료</NextButton>
        </Link>
      </MenuWrapper>
      {state.problems.map((value) => {
        return (
          <React.Fragment key={value.id}>
            <InputBox>
              <ProblemHead>
                <p>문제</p>
                <p>1/20</p>
              </ProblemHead>
              {toggleState ? (
                <>
                  <InputContainer>
                    <InputWrapper>
                      <CreateInput
                        value={value.question}
                        name="question"
                        onChange={(e) => onChangeInput(e, value.id)}
                        type="text"
                        placeholder="문제를 작성해주세요"
                      />
                      <ImgInputWrapper>
                        <input
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          onChange={onUpload}
                        />
                        <ImgInput onClick={onUploadImageButtonClick}>
                          <img width={"100%"} src={imageSrc} alt="" />
                          {imageSrc ? (
                            ""
                          ) : (
                            <>
                              <p>문제집 표시에 들어갈</p>
                              <p>사진을 넣어주세요</p>
                            </>
                          )}
                        </ImgInput>
                      </ImgInputWrapper>
                    </InputWrapper>
                    <AnswerInputContainer>
                      <p>답 선택</p>
                      <FourAnswerInputContainer>
                        {InputObject.map((item) => (
                          <FourAnswerInput key={item.name}>
                            <div>{item.name}</div>
                            <input placeholder="답을 입력해주세요" />
                          </FourAnswerInput>
                        ))}
                      </FourAnswerInputContainer>
                    </AnswerInputContainer>
                    <FourAnswerExpContainer>
                      <p>풀이</p>
                      <input placeholder="풀이를 작성해주세요." />
                    </FourAnswerExpContainer>
                  </InputContainer>
                </>
              ) : (
                <>
                  <InputContainer>
                    <InputWrapper>
                      <CreateInput
                        value={value.question}
                        name="question"
                        onChange={(e) => onChangeInput(e, value.id)}
                        type="text"
                        placeholder="문제를 작성해주세요"
                      />
                      <ImgInputWrapper>
                        <input
                          type="file"
                          accept="image/*"
                          ref={inputRef}
                          onChange={onUpload}
                        />
                        <ImgInput onClick={onUploadImageButtonClick}>
                          <img width={"100%"} src={imageSrc} alt="" />
                          {imageSrc ? (
                            ""
                          ) : (
                            <>
                              <p>문제집 표시에 들어갈</p>
                              <p>사진을 넣어주세요</p>
                            </>
                          )}
                        </ImgInput>
                      </ImgInputWrapper>
                    </InputWrapper>
                    <AnswerInputContainer>
                      <p>답 선택</p>
                      <FourAnswerInputContainer>
                        {OXObject.map((item) => (
                          <OXAnswerContainer>
                            <button> {item.name}</button>
                          </OXAnswerContainer>
                        ))}
                      </FourAnswerInputContainer>
                    </AnswerInputContainer>
                    <OXExplanationContainer>
                      <p>풀이</p>
                      <input placeholder="풀이를 작성해주세요." />
                    </OXExplanationContainer>
                  </InputContainer>
                </>
              )}
            </InputBox>
          </React.Fragment>
        );
      })}
      <AddBtnWrapper>
        <AddBtn onClick={() => addProblem()}>
          <img height={30} src={plus} alt="" />
        </AddBtn>
      </AddBtnWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1150px;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ToggleDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 34px;
  > p {
    font-weight: 400;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ToggleState = styled.div<{ isState: boolean }>`
  display: flex;
  justify-items: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin-right: 18px;
  border-radius: 6px;
  background-color: ${({ isState, theme }) =>
    isState ? theme.colors.greanScale.main : theme.colors.grayScale.Gray};
`;

const NextButton = styled.button`
  cursor: pointer;
  width: 120px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  :disabled {
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    background-color: ${({ theme }) => theme.colors.grayScale.Gray};
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1150px;
  height: 800px;
  margin-top: 20px;
  margin-bottom: 20px;
  gap: 22px;
  padding: 20px 55px 40px 55px;
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
`;

const CreateInput = styled.input`
  width: 500px;
  height: 50px;
  padding: 15px 28px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  border-radius: 18px;
  outline: none;
  color: ${({ theme }) => theme.colors.TextColor};
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
`;

const ImgInputWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  > input {
    display: none;
  }
`;

const ImgInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 400px;
  height: 350px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
  > p {
    font-weight: 600;
    font-size: 20px;
    background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
    color: ${({ theme }) => theme.colors.grayScale.Dark_Gray};
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
  > div {
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
  > input {
    width: 420px;
    height: 50px;
    padding: 15px 24px;
    border-radius: 18px;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
    font-size: 20px;
    font-weight: 400;
  }
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

const ExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 40px;
  > p {
    font-weight: 400;
    font-size: 22px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
  > input {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    border-radius: 18px;
    outline: none;
    color: ${({ theme }) => theme.colors.TextColor};
    font-size: 18px;
    :focus {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const FourAnswerExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 20px;
  > p {
    font-weight: 400;
    font-size: 22px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
  > input {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    border-radius: 18px;
    outline: none;
    color: ${({ theme }) => theme.colors.TextColor};
    font-size: 18px;
    :focus {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const OXExplanationContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  margin-top: 70px;
  > p {
    font-weight: 400;
    font-size: 22px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
  > input {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    border-radius: 18px;
    outline: none;
    color: ${({ theme }) => theme.colors.TextColor};
    font-size: 18px;
    :focus {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const AddBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AddBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 60px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  border-radius: 100%;
`;

export default CreateQuestion;
