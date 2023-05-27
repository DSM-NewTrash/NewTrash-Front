import styled from "styled-components";
import github from "../../assets/footer/github.svg";
import notion from "../../assets/footer/notion.svg";

const Footer = () => {
  return (
    <Wrapper>
      <InfoContainer>
        <h1>NEWTRASH</h1>
        <div>
          <p>@ 2023. newtrash All rights reserved</p>
          <p>(34111) 대전광역시 유성구 가정북로 76 (장동 23-9)</p>
          <p>newtrash@dsm.hs.kr</p>
        </div>
      </InfoContainer>
      <IconContainer>
        <div>
          <img width={55} src={github} alt="" />
        </div>
        <div>
          <img width={55} src={notion} alt="" />
        </div>
      </IconContainer>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 350px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};
  padding: 70px 200px;
`;

const InfoContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.greanScale.main};

  > h1 {
    margin-bottom: 18px;
    font-weight: 500;
    font-size: 36px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.greanScale.main};
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 14px;
    background-color: ${({ theme }) => theme.colors.greanScale.main};

    > p {
      font-weight: 400;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.white};
      background-color: ${({ theme }) => theme.colors.greanScale.main};
    }
  }
`;

const IconContainer = styled.div`
  margin-top: 80px;
  display: flex;
  align-items: center;
  gap: 30px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export default Footer;
