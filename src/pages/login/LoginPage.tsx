import styled from "styled-components";
import Login from "../../components/login";

const LoginPage = () => {
  return (
    <Wrapper>
      <Login />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default LoginPage;
