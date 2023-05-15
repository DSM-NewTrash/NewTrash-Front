import { Link } from "react-router-dom";
import styled from "styled-components";
import QuizItem from "../common/QuizItem";

const NewList = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <p className="title">NEW 문제집</p>
        <Link to="/new" style={{ textDecoration: "none", color: "black" }}>
          <p className="see">최신 문제집 보러가기 &#62;</p>
        </Link>
      </TitleContainer>
      <ItemListWrapper>
        <QuizItem />
      </ItemListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;
  margin-top: 64px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 26px;

  .title {
    font-weight: 400;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.black};
  }

  .see {
    cursor: pointer;
    font-weight: 400;
    font-size: 24px;
    color: ${({ theme }) => theme.colors.greanScale.Light_Grean};

    :hover {
      text-decoration: underline;
    }
  }
`;

const ItemListWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;

export default NewList;
