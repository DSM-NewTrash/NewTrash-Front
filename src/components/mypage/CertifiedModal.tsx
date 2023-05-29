import styled from "styled-components";
import { Dispatch, SetStateAction, useState, useRef, useCallback } from "react";
import upload from "../../assets/upload.svg";
import { useCertificateUserApi } from "../../utils/api/user";

interface Props {
  setModalState: Dispatch<SetStateAction<boolean>>;
}

const CertifiedModal = ({ setModalState }: Props) => {
  const [inputState, setInputState] = useState<string>();
  const [imageSrc, setImageSrc]: any = useState(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [btnState, setBtnState] = useState<boolean>(true);

  const closeModal = () => {
    setModalState(false);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputState(value);

    if (inputState === "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
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

  const { mutate: certificate } = useCertificateUserApi();

  const onClickCertificate = () => {
    certificate({ certificate: inputState! });
    setModalState(false);
  };

  return (
    <ModalWrapper>
      <Wrapper>
        <input
          onChange={onChangeInput}
          value={inputState}
          type="text"
          name="certificate"
          placeholder="자격증 및 인증서를 작성해주세요."
        />

        <UploadBtn onClick={onUploadImageButtonClick}>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onUpload}
          />
          <img src={upload} alt="" />
          <p>Upload File</p>
        </UploadBtn>

        <BtnWrapper>
          <CancellButton onClick={closeModal}>취소하기</CancellButton>
          <NextButton disabled={btnState} onClick={onClickCertificate}>
            인증하기
          </NextButton>
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

  > input {
    width: 100%;
    height: 50px;
    border-radius: 12px;
    margin-bottom: 20px;
    padding: 12px 25px;
    border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};

    :focus {
      background-color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const UploadBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;
  height: 40px;
  padding: 8px 20px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 10px;
  margin-bottom: 130px;
  margin-left: 430px;

  > input {
    display: none;
  }

  > p {
    font-weight: 590;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.greanScale.main};
  }
`;

const CancellButton = styled.button`
  cursor: pointer;
  width: 300px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Light_Gray};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
  font-size: 18px;
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
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};

  :disabled {
    color: ${({ theme }) => theme.colors.greanScale.main};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export default CertifiedModal;
