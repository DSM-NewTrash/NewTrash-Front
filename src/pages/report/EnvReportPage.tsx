import styled from "styled-components";
import EnvReport from "../../components/report";
import Header from "../../components/header";

const EnvReportPage = () => {
  return (
    <Wrapper>
      <Header />
      <EnvReport />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default EnvReportPage;
