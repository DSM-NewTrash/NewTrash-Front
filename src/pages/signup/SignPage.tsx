import styled from "styled-components";
import SignUp from "../../components/signup";

const SignUpPage = () => {
  return (
    <Wrapper>
      <SignUp />
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

export default SignUpPage;
