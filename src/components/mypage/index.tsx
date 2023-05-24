import styled from "styled-components";
import Profile from "./Profile";
import MyCreateList from "./MyCreateList";

const MyPage = () => {
  return (
    <Wrapper>
      <Profile />
      <MyCreateList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 1150px;
  display: flex;
  justify-content: space-between;
`;

export default MyPage;
