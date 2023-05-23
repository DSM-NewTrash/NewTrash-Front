import styled from "styled-components";
import background from "../../assets/background.png";
import { useState } from "react";

const SignUp = () => {
  const [btnState, setBtnState] = useState<boolean>(true);
  const [signupState, setSignupState] = useState({
    nickname: "",
    id: "",
    password: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupState({ ...signupState, [name]: value });
    if (
      signupState.nickname === "" ||
      signupState.id === "" ||
      signupState.password === ""
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  return (
    <Wrapper>
      <SignUpWrapper>
        <TitleText>SIGN UP</TitleText>
        <input
          value={signupState.nickname}
          name="nickname"
          onChange={onChangeInput}
          type="text"
          placeholder="NickName"
        />
        <input
          value={signupState.id}
          name="id"
          onChange={onChangeInput}
          type="text"
          placeholder="ID"
        />
        <input
          value={signupState.password}
          name="password"
          onChange={onChangeInput}
          type="password"
          placeholder="Password"
        />
        <NextButton disabled={btnState}>회원가입</NextButton>
      </SignUpWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size: cover;
`;

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 80px;
  width: 500px;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 30px;

  > input {
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
    width: 100%;
    height: 40px;
    margin-bottom: 40px;
    font-size: 18px;
  }
`;

const TitleText = styled.h1`
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 50px;
  color: ${({ theme }) => theme.colors.greanScale.main};
  background-color: ${({ theme }) => theme.colors.white};
`;

const NextButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 50px;
  margin-top: 40px;
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

export default SignUp;
