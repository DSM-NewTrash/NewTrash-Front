import styled from "styled-components";
import Header from "../../components/header";
import MyPage from "../../components/mypage";

const MyPagePage = () => {
  return (
    <Wrapper>
      <Header />
      <MyPage />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MyPagePage;
