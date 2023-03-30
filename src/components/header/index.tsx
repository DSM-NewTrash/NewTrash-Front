import styled from "styled-components";
import Vector from "../../assets/Vector.svg";

const Header = () => {
  return (
    <Wrapper>
      <LogoBox />
      <MenuContainer>
        <p>환경 신고</p>
        <p>문제집</p>
        <p>문제 출제하기</p>
      </MenuContainer>
      <SearchBox>
        <SearchInput placeholder="문제집을 검색해주세요" type="text" />
        <img src={Vector} alt="" />
      </SearchBox>
      <StoreBox />
      <UserBox />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 15px;
  margin-bottom: 80px;
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

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 40px;
  z-index: 99;
  padding: 15px 20px;

  > img {
    margin-left: 20px;
    width: 20px;
    height: 20px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  color: ${({ theme }) => theme.colors.TextColor};
  z-index: 2;

  :focus {
    outline: none;
  }
`;

const StoreBox = styled.div`
  width: 40px;
  height: 40px;
  margin-left: 70px;
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
