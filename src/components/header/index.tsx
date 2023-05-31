import styled from "styled-components";
import logo from "../../assets/logo.svg";
import user from "../../assets/user.svg";
import basket from "../../assets/basket.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import swal from "sweetalert";

const Header = () => {
  const [tokenState, setTokenState] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setTokenState(true);
    } else {
      setTokenState(false);
    }
  }, []);

  const onClickMarket = () => {
    tokenState
      ? navigate("/market")
      : swal("error", "로그인 후 이용 가능합니다.", "error");
  };

  const onClickProfile = () => {
    navigate("/mypage");
  };

  const onClickReport = () => {
    tokenState
      ? navigate("/env-report")
      : swal("error", "로그인 후 이용 가능합니다.", "error");
  };

  const onClickMake = () => {
    tokenState
      ? navigate("/first-create")
      : swal("error", "로그인 후 이용 가능합니다.", "error");
  };

  return (
    <Wrapper>
      <MenuWrapper>
        <Link to="/">
          <LogoWrapper>
            <img width={300} height={40} src={logo} alt="" />
          </LogoWrapper>
        </Link>
        <MenuContainer>
          <p onClick={onClickReport}>환경 신고</p>
          <HoverDropdown>
            <p>문제집</p>
            <DropdownContent className="DropdownContent">
              <Link
                to="/new"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>최신 문제집</p>
              </Link>
              <Link
                to="/popular"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>인기 문제집</p>
              </Link>
            </DropdownContent>
          </HoverDropdown>
          <p onClick={onClickMake}>문제 출제하기</p>
        </MenuContainer>
      </MenuWrapper>
      <Container>
        <img onClick={onClickMarket} height={30} src={basket} alt="" />
        {tokenState ? (
          <img onClick={onClickProfile} height={30} src={user} alt="" />
        ) : (
          <AuthWrapper>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              로그인
            </Link>
            /
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "black" }}
            >
              회원가입
            </Link>
          </AuthWrapper>
        )}
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

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  height: 40px;
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

  > img {
    cursor: pointer;
    margin-right: 70px;
  }
`;

const HoverDropdown = styled.div`
  position: relative;
  display: inline-block;

  > p {
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
  }

  :hover .DropdownContent {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 20px;
  right: -45px;
  min-width: 120px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  z-index: 1;

  > a {
    padding: 12px;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
      background-color: ${({ theme }) => theme.colors.greanScale.main};
      > p {
        background-color: ${({ theme }) => theme.colors.greanScale.main};
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;

const AuthWrapper = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  display: flex;
`;

export default Header;
