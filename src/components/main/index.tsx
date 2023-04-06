import styled from "styled-components";
import Slide from "./Slide";
import UserInfo from "./UserInfo";

const Main = () => {
  return (
    <Wrapper>
      <UserInfo />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Main;
