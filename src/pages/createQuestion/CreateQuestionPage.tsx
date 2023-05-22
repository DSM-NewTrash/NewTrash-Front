import styled from "styled-components";
import Header from "../../components/header";
import CreateQuestion from "../../components/create/CreateQuestion";

const CreatePage = () => {
  return (
    <Wrapper>
      <Header />
      <CreateQuestion />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default CreatePage;
