import styled from "styled-components";
import Header from "../../components/header";
import NewList from "../../components/list/NewList";

const NewListPage = () => {
  return (
    <Wrapper>
      <Header />
      <NewList />
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
