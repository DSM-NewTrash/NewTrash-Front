import { useState } from "react";
import styled from "styled-components";
import certified from "../../assets/item/certified.svg";
import send from "../../assets/item/send.svg";
import graySend from "../../assets/item/graysend.svg";
import graph from "../../assets/item/graph.svg";
import { useNavigate } from "react-router-dom";
import CertifiedModal from "./CertifiedModal";
import { useApiError } from "../../hooks/useApiError";
import { useQuery } from "react-query";
import { getMyPageInfo } from "../../utils/api/user";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const onClickModalOpen = () => {
    setModalOpen(true);
  };

  const { handleError } = useApiError();

  const { data: mypage } = useQuery(["mypage"], () => getMyPageInfo(), {
    onError: handleError,
  });

  return (
    <Wrapper>
      <ImgDiv>
        <img height={80} src={mypage?.data.profile} alt="" />
      </ImgDiv>
      <UserInfoContainer>
        <img height={40} src={mypage?.data.badge_image} alt="" />
        <p>{mypage?.data.nickname}</p>
        {mypage?.data.is_certificate && <img src={certified} alt="" />}
      </UserInfoContainer>
      <IdText>#{mypage?.data.id}</IdText>
      <OneLineIntroBox>
        <h1>한 줄 소개</h1>
        <hr />
        <p>{mypage?.data.introduce}</p>
      </OneLineIntroBox>
      <UserInfoBlock>
        <div>
          <img src={graph} alt="" />
        </div>
        <p className="level">
          Lv.{mypage?.data.level} {mypage?.data.badge}
        </p>
        <p className="exp">경험치 {mypage?.data.exp}</p>
      </UserInfoBlock>
      <UserInfoBlock>
        <div>
          <img src={mypage?.data.is_certificate ? send : graySend} alt="" />
        </div>
        {mypage?.data.is_certificate ? (
          <p className="level">{mypage?.data.certificate}</p>
        ) : (
          <p className="level">자격증을 인증해주세요.</p>
        )}
      </UserInfoBlock>
      <UserInfoBlock onClick={onClickModalOpen} style={{ cursor: "pointer" }}>
        <div>
          <img src={graySend} alt="" />
        </div>
        <p className="bedge">환경 관련 자격증/서류사진 인증하기</p>
      </UserInfoBlock>
      <NextButton>프로필 수정</NextButton>
      <LogOutBtn onClick={onClickLogout}>로그아웃</LogOutBtn>
      {modalOpen && <CertifiedModal setModalState={setModalOpen} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 350px;
  height: 700px;
  padding: 40px 40px 24px 40px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 20px;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  margin-bottom: 20px;
  border-radius: 100%;
  border: 1px solid black;
`;

const BadgeDiv = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2px;

  > p {
    font-weight: 400;
    margin-left: 7px;
    font-size: 22px;
    color: ${({ theme }) => theme.colors.black};
  }

  > img {
    margin-left: 4px;
  }
`;

const IdText = styled.div`
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grayScale.Dark_Gray};
`;

const OneLineIntroBox = styled.div`
  width: 290px;
  height: 60px;
  border-radius: 5px;
  padding: 8px 14px;

  > h1 {
    font-weight: 510;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.TextColor};
  }

  > hr {
    margin-top: 8px;
    margin-bottom: 8px;
  }

  > p {
    font-weight: 400;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const UserInfoBlock = styled.div`
  display: flex;
  align-items: center;
  margin-top: 14px;
  width: 290px;
  height: 60px;
  border-radius: 5px;
  padding: 10px 17px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    margin-right: 14px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.white};
  }

  .level {
    margin-right: 4px;
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.black};
  }

  .exp {
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.greanScale.Dark_Grean};
  }

  .bedge {
    font-weight: 400;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.TextColor};
  }
`;

const NextButton = styled.button`
  cursor: pointer;
  margin-top: 20px;
  width: 290px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.greanScale.main};
`;

const LogOutBtn = styled.button`
  cursor: pointer;
  margin-top: 20px;
  width: 290px;
  height: 50px;
  border: 1px solid #ff4343;
  background-color: white;
  border-radius: 18px;
  font-size: 18px;
  font-weight: 400;
  color: #ff4343;

  :hover {
    background-color: #ff4343;
    color: white;
  }
`;

export default Profile;
