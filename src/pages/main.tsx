import styled from "styled-components";
import Header from "../components/header";

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <p>aaa</p>
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
