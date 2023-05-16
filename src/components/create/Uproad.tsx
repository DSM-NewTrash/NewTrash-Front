import { useState, useRef, useCallback } from "react";
import styled from "styled-components";

const Uproad = () => {
  const [imageSrc, setImageSrc]: any = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
      <input type="file" accept="image/*" ref={inputRef} onChange={onUpload} />
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
  height: 460px;
  margin-top: 20px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};

  > p {
    font-weight: 600;
    font-size: 20px;
    background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
    color: ${({ theme }) => theme.colors.grayScale.Dark_Gray};
  }
`;

export default Uproad;
