import List from "../../components/list/List";
import styled from "styled-components";
import Header from "../../components/header";

const NewListPage = () => {
  return (
    <Wrapper>
      <Header />
      <List />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default NewListPage;
