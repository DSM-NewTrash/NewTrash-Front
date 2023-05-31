import { useState } from "react";
import styled from "styled-components";
import StarLating from "./StarLating";
import { book, hash, paper, pen, whitestar } from "../../assets/item/index";

interface Props {
  quiz_img: string;
  quiz_title: string;
  quiz_maker: string;
  quiz_length: number;
  description: string;
  star_lating: number;
  category: string[];
}

const HoverCoverContent = () => {
  return (
    <HoverCover>
      <CoverContent>
        <CoverItem>
          <img src={book} alt="book" />
          <p>00문제집, 최희</p>
        </CoverItem>
        <CoverItem>
          <img src={hash} alt="book" />
          <p>00문제집, 최희</p>
        </CoverItem>
        <CoverItem>
          <img src={whitestar} alt="book" />
          <p>3</p>
        </CoverItem>
        <CoverItem>
          <img src={paper} alt="book" />
          <p>20문제</p>
        </CoverItem>
        <CoverItem>
          <img src={pen} alt="book" />
          <p>
            분리수거 심화 문제입니다. 기초를 배우고 오시는걸 추천하는 바입니다
            분리수거 심화 문제입니다. 기초를 배우고 오시는걸 추천하는
          </p>
        </CoverItem>
      </CoverContent>
    </HoverCover>
  );
};

const QuizItem = () => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Wrapper
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover && <HoverCoverContent />}
      <ImgWrapper />
      <ContentWrapper>
        <QuizInfoWrapper>
          <p className="title">00문제집</p>
          <div className="star">
            <StarLating Input={false} star_lating={5} />
            <p className="starLating">(3)</p>
          </div>
        </QuizInfoWrapper>
        <CategoryList>
          <CategoryItem>
            <p>환경</p>
          </CategoryItem>
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

const ImgWrapper = styled.div`
  border-radius: 6px 6px 0px 0px;
  height: 180px;
  background-color: black;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
`;

const QuizInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .star {
    display: flex;
    align-items: center;
  }

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
  flex-wrap: wrap;
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
    font-size: 14px;
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
