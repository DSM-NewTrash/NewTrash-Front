import { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import certified from "../../assets/item/certified.svg";
import send from "../../assets/item/send.svg";
import graySend from "../../assets/item/graysend.svg";
import graph from "../../assets/item/graph.svg";
import { Form, useNavigate } from "react-router-dom";
import CertifiedModal from "./CertifiedModal";
import { useApiError } from "../../hooks/useApiError";
import { useQuery } from "react-query";
import { getMyPageInfo, useMyPagePatch } from "../../utils/api/user";
import userCamera from "../../assets/userCamera.svg";
import { useUploadImg } from "../../utils/api/upload";

const Profile = () => {
  const [modState, setModState] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [modInfo, setModInfo] = useState({
    profile: "",
    nickname: "",
    introduce: "",
  });
  const navigate = useNavigate();

  const onClickLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const onClickModalOpen = () => {
    setModalOpen(true);
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setModInfo({ ...modInfo, [name]: value });
  };

  const { handleError } = useApiError();

  const { data: mypage } = useQuery(["mypage"], () => getMyPageInfo(), {
    onError: handleError,
  });

  const { mutate: imgURL } = useUploadImg();
  const { mutate: patchMyPage } = useMyPagePatch();

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onUpload = (e: any) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append("files", uploadFile);

      imgURL(formData, {
        onSuccess: (data) => {
          setModInfo({ ...modInfo, profile: data.data.url });
        },
      });
    }
  };

  const onClickMod = () => {
    if (modState === false) {
      setModState(true);
    } else {
      const profileValue = Array.isArray(modInfo.profile)
        ? modInfo.profile[0]
        : modInfo.profile;

      patchMyPage({
        introduce: modInfo.introduce,
        nickname: modInfo.nickname,
        profile: profileValue,
      });
      setModState(false);
    }
  };

  return (
    <Wrapper>
      <ImgDiv>
        <img
          id="profile"
          width={125}
          height={120}
          style={{ borderRadius: "100%" }}
          src={mypage?.data.profile}
          alt=""
        />
        {modState && (
          <>
            <input
              className="imgInput"
              type="file"
              accept="image/*"
              ref={inputRef}
              onChange={onUpload}
            />
            <img
              id="change"
              src={userCamera}
              onClick={onUploadImageButtonClick}
              alt=""
            />{" "}
          </>
        )}
      </ImgDiv>
      <UserInfoContainer>
        {modState ? (
          <ModNickNameInput
            name="nickname"
            value={modInfo.nickname}
            type="text"
            onChange={onChangeInput}
          />
        ) : (
          <>
            <img
              height={40}
              style={{ borderRadius: "100%" }}
              src={mypage?.data.badge_image}
              alt=""
            />
            <p>{mypage?.data.nickname}</p>
            {mypage?.data.is_certificate && <img src={certified} alt="" />}
          </>
        )}
      </UserInfoContainer>
      <IdText>#{mypage?.data.id}</IdText>
      <OneLineIntroBox isMod={modState}>
        <h1>한 줄 소개</h1>
        <hr />
        {modState ? (
          <ModIntroInput
            value={modInfo.introduce}
            name="introduce"
            type="text"
            onChange={onChangeInput}
          />
        ) : (
          <p>{mypage?.data.introduce}</p>
        )}
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
      <NextButton onClick={onClickMod}>프로필 수정</NextButton>
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
  position: relative;

  #change {
    cursor: pointer;
    position: absolute;
    right: 5px;
    bottom: -5px;
    border-radius: 100%;
  }

  .imgInput {
    display: none;
  }
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
    background-color: ${({ theme }) => theme.colors.white};
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
  background-color: ${({ theme }) => theme.colors.white};
`;

const ModNickNameInput = styled.input`
  width: 140px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  padding: 5px 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};
  outline: none;

  :focus {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const ModIntroInput = styled.input`
  outline: none;
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  padding: 5px 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.grayScale.Light_Gray};

  :focus {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const OneLineIntroBox = styled.div<{ isMod: boolean }>`
  width: 290px;
  height: ${({ isMod }) => (isMod ? "90px" : "70px")};
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

  :hover {
    background-color: ${({ theme }) => theme.colors.greanScale.main};
    color: ${({ theme }) => theme.colors.white};
  }
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
