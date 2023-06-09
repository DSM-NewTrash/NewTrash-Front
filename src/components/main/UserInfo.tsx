import { useState, useEffect } from "react";
import styled from "styled-components";
import school from "../../assets/school.svg";
import { useApiError } from "../../hooks/useApiError";
import { useQuery } from "react-query";
import { getMyExpLevel, getMyProblemCount } from "../../utils/api/user";
import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilState } from "recoil";
import { pointCount } from "../../store/atom";

const UserInfo = () => {
  const [pointState, setPointState] = useRecoilState(pointCount);
  const [tokenState, setTokenState] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setTokenState(true);
    } else {
      setTokenState(false);
    }
  }, []);

  const { handleError } = useApiError();

  const { data: problem } = useQuery(["prolem"], () => getMyProblemCount(), {
    onError: handleError,
  });

  const { data: MyPage } = useQuery(["mypage"], () => getMyExpLevel(), {
    onError: handleError,
  });

  let expResult = (MyPage?.data.exp! / MyPage?.data.max_exp!) * 100;

  useEffect(() => {
    setPointState({ coin: MyPage?.data.point! });
  }, [MyPage?.data.point]);

  return (
    <Wrapper>
      <UserInfoContainer>
        {tokenState ? (
          <>
            <GraphBox>
              <CircularProgress
                style={{
                  width: "220px",
                  height: "220px",
                  color: "#69d2a6",
                }}
                variant="determinate"
                value={expResult}
              />
              <img height={150} src={MyPage?.data.badge_image} alt="" />
            </GraphBox>
            <UserTextContainer>
              <UserName>
                Lv.{MyPage?.data.level} {MyPage?.data.nickname}
              </UserName>
              <UserDescriptionWrapper>
                <UserDescription>현재 경험치는 </UserDescription>
                <UserDescriptionGreen>
                  {MyPage?.data.exp}EXP
                </UserDescriptionGreen>
                <UserDescription>입니다.</UserDescription>
              </UserDescriptionWrapper>
            </UserTextContainer>
          </>
        ) : (
          <NotLoginWrapper>
            <UserName>로그인 후 확인할 수 있습니다!</UserName>
          </NotLoginWrapper>
        )}
      </UserInfoContainer>
      <TodayQuestionBox>
        <img src={school} alt="icon" />
        <TodayCount>
          {tokenState ? <p>{problem?.data.count}/80</p> : <p>0/80</p>}
        </TodayCount>
        <CounterDescription>
          {problem?.data.count}문제 남았습니다
        </CounterDescription>
      </TodayQuestionBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 140px;
  width: 800px;
  height: 280px;
  margin-right: 40px;
  padding: 35px 40px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const NotLoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GraphBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 230px;
  height: 230px;
  border-radius: 100%;

  .css-1idz92c-MuiCircularProgress-svg {
    background-color: ${({ theme }) => theme.colors.white};
  }

  .css-oxts8u-MuiCircularProgress-circle {
    stroke-width: 2px;
  }

  > img {
    position: absolute;
    border-radius: 100%;
  }
`;

const UserTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 22px;
  font-weight: 510;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 18px;
`;

const UserDescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const UserDescription = styled.p`
  font-size: 18px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
`;

const UserDescriptionGreen = styled.p`
  font-size: 18px;
  font-weight: 510;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.greanScale.grean};
`;

const TodayQuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 280px;
  padding: 32px;
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};

  > img {
    width: 80px;
    margin-bottom: 30px;
  }
`;

const TodayCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};

  > p {
    background-color: ${({ theme }) => theme.colors.white};
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const CounterDescription = styled.p`
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  color: ${({ theme }) => theme.colors.TextColor};
`;

export default UserInfo;
