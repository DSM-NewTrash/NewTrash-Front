import { useState, useRef, useCallback } from "react";
import styled from "styled-components";

const EnvReport = () => {
  const [btnState, setBtnState] = useState<boolean>(true);
  const [imageSrc, setImageSrc]: any = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [reportState, setReportState] = useState({
    title: "",
    location: "",
    resons: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setReportState({ ...reportState, [name]: value });
    if (
      reportState.title === "" ||
      reportState.location === "" ||
      reportState.resons === ""
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  const onChangeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target;
    setReportState({ ...reportState, [name]: value });
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

  return (
    <Wrapper>
      <InputBox>
        <InputWrapper>
          <InputContainer>
            <p>환경신고 제목</p>
            <CreateInput
              value={reportState.title}
              name="title"
              onChange={onChangeInput}
              type="text"
              placeholder="제목을 입력해주세요"
            />
          </InputContainer>
          <InputContainer>
            <p>환경신고 지역</p>
            <CreateInput
              value={reportState.location}
              name="location"
              onChange={onChangeInput}
              type="text"
              placeholder="지역을 입력해주세요"
            />
          </InputContainer>
          <InputContainer>
            <p>환경신고 상세 내용</p>
            <CreateArea
              value={reportState.resons}
              name="resons"
              onChange={onChangeArea}
              placeholder="상세 내용을 입력해주세요"
            />
          </InputContainer>
        </InputWrapper>
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
      </InputBox>
      <NextButton disabled={btnState}>신고하기</NextButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1150px;
  height: 740px;
  margin-bottom: 30px;
  gap: 42px;
  padding: 50px 55px 60px 55px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
`;

const InputBox = styled.div`
  display: flex;
  gap: 60px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const InputWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 42px;
  background-color: ${({ theme }) => theme.colors.white};
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
  color: ${({ theme }) => theme.colors.TextColor};
  font-size: 18px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};

  :focus {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const CreateArea = styled.textarea`
  height: 240px;
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

const ImgInputWrapper = styled.div`
  margin-top: 34px;
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
  width: 500px;
  height: 495px;
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

export default EnvReport;
