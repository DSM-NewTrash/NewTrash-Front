import styled from "styled-components";
import Header from "../../components/header";
import Market from "../../components/market";

const MarketPage = () => {
  return (
    <Wrapper>
      <Header />
      <Market />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MarketPage;
