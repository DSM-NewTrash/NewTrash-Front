import styled from "styled-components";
import NewList from "./NewList";
import PopularList from "./PopularList";
import Slide from "./Slide";
import UserInfo from "./UserInfo";

const Main = () => {
  return (
    <Wrapper>
      <Slide />
      <UserInfo />
      <PopularList />
      <NewList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;
`;

export default Main;
