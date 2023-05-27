import styled from "styled-components";
import Header from "../components/header";
import Main from "../components/main";
import Footer from "../components/footer";

const MainPage = () => {
  return (
    <Wrapper>
      <Header />
      <Main />
      <Footer />
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
