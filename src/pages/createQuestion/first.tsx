import styled from "styled-components";
import FirstCreate from "../../components/create/FirstCreate";
import Header from "../../components/header";

const FirstCreatePage = () => {
  return (
    <Wrapper>
      <Header />
      <FirstCreate />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default FirstCreatePage;
