import styled from "styled-components";
import background from "../../assets/background.png";
import { useState } from "react";
import { useLogin } from "../../utils/api/auth";

const Login = () => {
  const [btnState, setBtnState] = useState<boolean>(true);
  const [loginState, setLoginState] = useState({
    id: "",
    password: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginState({ ...loginState, [name]: value });
    if (loginState.id === "" || loginState.password === "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  };

  const { mutate: loginMutate } = useLogin();

  const onClickSign = () => {
    loginMutate({
      id: loginState.id,
      password: loginState.password,
    });
  };

  return (
    <Wrapper>
      <SignUpWrapper>
        <TitleText>LOGIN</TitleText>
        <input
          value={loginState.id}
          name="id"
          onChange={onChangeInput}
          type="text"
          placeholder="ID"
          maxLength={11}
        />
        <input
          value={loginState.password}
          name="password"
          onChange={onChangeInput}
          type="password"
          placeholder="Password"
          maxLength={11}
        />
        <NextButton disabled={btnState} onClick={onClickSign}>
          로그인
        </NextButton>
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
  margin-bottom: 90px;
  color: ${({ theme }) => theme.colors.greanScale.main};
  background-color: ${({ theme }) => theme.colors.white};
`;

const NextButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 50px;
  margin-top: 80px;
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

export default Login;
