import { Link } from "react-router-dom";
import styled from "styled-components";
import QuizItem from "../common/QuizItem";
import { useApiError } from "../../hooks/useApiError";
import { useQuery } from "react-query";
import { getProblemList } from "../../utils/api/problem";

const PopularList = () => {
  const { handleError } = useApiError();

  const { data: list } = useQuery(
    "list",
    () => getProblemList({ option: "GOOD", auth: false }),
    {
      onError: handleError,
    }
  );

  return (
    <Wrapper>
      <TitleContainer>
        <p className="title">전체 문제집 인기순위</p>
        <Link to="/popular" style={{ textDecoration: "none", color: "black" }}>
          <p className="see">인기 순위 보러가기 &#62;</p>
        </Link>
      </TitleContainer>
      <ItemListWrapper>
        {list?.data.quizResponses.slice(0, 4).map((item) => (
          <QuizItem
            key={item.id}
            category={item.category}
            id={item.id}
            image={item.image}
            introduction={item.introduction}
            isCertificate={item.isCertificate}
            starRating={item.starRating}
            title={item.title}
            totalProblem={item.totalProblem}
            writer={item.writer}
          />
        ))}
      </ItemListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1240px;
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
  width: 1300px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;

export default PopularList;
