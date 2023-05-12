import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Wrapper>
      <Link to="/main">
        <LogoBox />
      </Link>
      <MenuContainer>
        <p>환경 신고</p>
        <p>문제집</p>
        <Link
          to="/first-create"
          style={{ textDecoration: "none", color: "black" }}
        >
          <p>문제 출제하기</p>
        </Link>
      </MenuContainer>
      <Container>
        <StoreBox />
        <UserBox />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 15px;
  margin-bottom: 40px;
  background: #fcfcfc;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.1);
`;

const LogoBox = styled.div`
  width: 250px;
  height: 40px;
  margin-left: 30px;
  background-color: gray;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 380px;
  margin-left: 55px;
  margin-right: 75px;

  > p {
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;

const StoreBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.grayScale.Gray};
`;

const UserBox = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 40px;
  border-radius: 100%;
  border: 1px solid black;
`;

export default Header;
