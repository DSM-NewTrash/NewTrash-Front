import styled from "styled-components";
import QuizItem from "../common/QuizItem";

const PopularList = () => {
  return (
    <Wrapper>
      <TitleContainer>
        <p className="title">전체 문제집 인기순위</p>
        <p className="see">인기 순위 보러가기 &#62;</p>
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

const ItemListWrapper = styled.div``;

export default PopularList;
