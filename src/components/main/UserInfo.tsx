import styled from "styled-components";
import school from "../../assets/school.svg";

const UserInfo = () => {
  return (
    <Wrapper>
      <UserInfoContainer>
        <GraphBox />
        <UserTextContainer>
          <UserName>Lv.5 토끼끼끼</UserName>
          <UserDescriptionWrapper>
            <UserDescription>현재 경험치는 </UserDescription>
            <UserDescriptionGreen>8425EXP</UserDescriptionGreen>
            <UserDescription>입니다.</UserDescription>
          </UserDescriptionWrapper>
        </UserTextContainer>
      </UserInfoContainer>
      <TodayQuestionBox>
        <img src={school} alt="icon" />
        <TodayCount>
          <p>0/80</p>
        </TodayCount>
        <CounterDescription>80문제 남았습니다</CounterDescription>
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

const GraphBox = styled.div`
  width: 230px;
  height: 230px;
  border-radius: 100%;
  background-color: black;
`;

const UserTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.p`
  font-size: 22px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
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
  font-weight: 400;
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
