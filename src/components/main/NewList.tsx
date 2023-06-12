import { Link } from "react-router-dom";
import styled from "styled-components";
import QuizItem from "../common/QuizItem";
import { useApiError } from "../../hooks/useApiError";
import { useQuery } from "react-query";
import { getProblemList } from "../../utils/api/problem";

const NewList = () => {
  const { handleError } = useApiError();

  const { data: list } = useQuery(
    "list",
    () => getProblemList({ option: "RECENCY", auth: false }),
    {
      onError: handleError,
    }
  );

  console.log(list?.data);

  return (
    <Wrapper>
      <TitleContainer>
        <p className="title">NEW 문제집</p>
        <Link to="/new" style={{ textDecoration: "none", color: "black" }}>
          <p className="see">최신 문제집 보러가기 &#62;</p>
        </Link>
      </TitleContainer>
      <ItemListWrapper>
        {list?.data.quizResponses.slice(0, 4).map((item) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/quizs/${item.id}`}
          >
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
          </Link>
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
  width: 100%;
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
    font-size: 20px;
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

export default NewList;
