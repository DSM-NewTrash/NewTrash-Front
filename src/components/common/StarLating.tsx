import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import star from "../../assets/star.svg";
import { useRecoilState } from "recoil";
import { solveResult } from "../../store/atom";
import { useMutation } from "react-query";
import { SubmitProblemStar } from "../../utils/api/problem";

interface Props {
  Input: boolean;
  star_lating: number;
}

const StarLating = ({ Input, star_lating }: Props) => {
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [resultState, setResultState] = useRecoilState(solveResult);

  const handleStarClick = (index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
  }, [clicked]); //컨디마 컨디업

  let score = clicked.filter(Boolean).length;

  const { mutate: review } = useMutation(() =>
    SubmitProblemStar(resultState.problemId, score)
  );

  const sendReview = () => {
    review();
  };

  let arr1 = [];

  for (let i = 1; i < star_lating + 1; i++) {
    arr1.push(i);
  }

  return (
    <Stars inputSize={Input}>
      {Input ? (
        [1, 2, 3, 4, 5].map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="50"
              onClick={() => handleStarClick(idx)}
              className={clicked[idx] ? "yellowStar" : ""}
            />
          );
        })
      ) : (
        <>
          {arr1.map(() => (
            <img src={star} alt="*" className="star" />
          ))}
        </>
      )}
    </Stars>
  );
};

const Stars = styled.div<{ inputSize: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  margin-left: 5px;
  margin-right: 8px;

  .star {
    margin-right: 3px;
  }

  & svg {
    width: ${({ inputSize }) => (inputSize ? "58px" : "14px")};
    height: ${({ inputSize }) => (inputSize ? "58px" : "14px")};
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;

export default StarLating;
