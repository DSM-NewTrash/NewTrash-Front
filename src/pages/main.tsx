import styled from "styled-components";
import Header from "../components/header";
import Main from "../components/main";

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MainPage;
