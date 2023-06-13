import styled from "styled-components";
import Header from "../../components/header";
import ProblemResult from "../../components/problem/Result";

const ProblemResultPage = () => {
  return (
    <Wrapper>
      <Header />
      <ProblemResult />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ProblemResultPage;
