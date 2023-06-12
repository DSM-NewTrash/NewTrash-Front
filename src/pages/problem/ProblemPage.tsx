import styled from "styled-components";
import Header from "../../components/header";
import Problem from "../../components/problem";

const ProblemPage = () => {
  return (
    <Wrapper>
      <Header />
      <Problem />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ProblemPage;
