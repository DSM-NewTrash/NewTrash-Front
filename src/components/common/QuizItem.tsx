import styled from "styled-components";
import StarLating from "./StarLating";

interface Props {
  quiz_img: string;
  quiz_title: string;
  quiz_maker: string;
  quiz_length: number;
  description: string;
  star_lating: number;
  category: string[];
}

const QuizItem = () => {
  return (
    <Wrapper>
      <ImgWrapper />
      <ContentWrapper>
        <QuizInfoWrapper>
          <p className="title">00문제집</p>
          <StarLating Input={false} star_lating={3} />
          <p className="starLating">(3)</p>
        </QuizInfoWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 1.71064px 6.84255px rgba(33, 33, 33, 0.25);
  border-radius: 6px;
  width: 270px;
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
  padding: 18px 24px;
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
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
`;

export default QuizItem;
