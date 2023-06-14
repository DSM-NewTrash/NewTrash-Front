import styled from "styled-components";
import Header from "../../components/header";
import SolveProblem from "../../components/solve";

const SolveProblemPage = () => {
  return (
    <Wrapper>
      <Header />
      <SolveProblem />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default SolveProblemPage;
