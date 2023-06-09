import { useState } from "react";
import styled from "styled-components";
import StarLating from "./StarLating";
import { book, hash, paper, pen, whitestar } from "../../assets/item/index";

interface Props {
  id: number;
  image: string;
  title: string;
  introduction: string;
  category: string;
  starRating: number;
  writer: string;
  isCertificate: boolean;
  totalProblem: number;
}

const HoverCoverContent = ({
  title,
  writer,
  category,
  starRating,
  totalProblem,
  introduction,
}: Props) => {
  return (
    <HoverCover>
      <CoverContent>
        <CoverItem>
          <img src={book} alt="book" />
          <p>
            {title}, {writer}
          </p>
        </CoverItem>
        <CoverItem>
          <img src={hash} alt="book" />
          <p>{category}</p>
        </CoverItem>
        <CoverItem>
          <img src={whitestar} alt="book" />
          <p>{starRating}</p>
        </CoverItem>
        <CoverItem>
          <img src={paper} alt="book" />
          <p>{totalProblem}문제</p>
        </CoverItem>
        <CoverItem>
          <img src={pen} alt="book" />
          <p>{introduction}</p>
        </CoverItem>
      </CoverContent>
    </HoverCover>
  );
};

const QuizItem = (props: Props) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Wrapper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && (
        <HoverCoverContent
          category={props.category}
          title={props.title}
          writer={props.writer}
          starRating={props.starRating}
          totalProblem={props.totalProblem}
          introduction={props.introduction}
          id={0}
          image=""
          isCertificate={false}
        />
      )}
      <img height={200} src={props.image} alt="" />
      <ContentWrapper>
        <QuizInfoWrapper>
          <p className="title">{props.title}</p>
          <CategoryItem>
            <p>{props.category}</p>
          </CategoryItem>
        </QuizInfoWrapper>
        <CategoryList>
          <div className="star">
            <StarLating Input={false} star_lating={props.starRating} />
            <p className="starLating">({props.starRating})</p>
          </div>
        </CategoryList>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 1.71064px 6.84255px rgba(33, 33, 33, 0.25);
  border-radius: 6px;
  width: 280px;
  height: 300px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 12px;
`;

const QuizInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: 400;
    font-size: 20px;
    color: ${({ theme }) => theme.colors.black};
  }

  .starLating {
    margin-left: 5px;
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
`;

const CategoryList = styled.div`
  margin-top: 12px;
  display: flex;

  .star {
    display: flex;
    align-items: center;

    > p {
      color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
    }
  }
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 25px;
  border: 2px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 20px;

  > p {
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.greanScale.main};
  }
`;

const HoverCover = styled.div`
  position: absolute;
  padding: 20px 16px;
  border-radius: 6px;
  opacity: 0.855;
  background-color: ${({ theme }) => theme.colors.black};
  width: 280px;
  height: 300px;
`;

const CoverContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.black};
  gap: 13px;
`;

const CoverItem = styled.div`
  z-index: 99;
  display: flex;
  background-color: ${({ theme }) => theme.colors.black};

  > img {
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.black};
    margin-right: 16px;
  }

  > p {
    background-color: ${({ theme }) => theme.colors.black};
    font-size: 14px;
    font-weight: 590;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default QuizItem;
