import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import star from "../../assets/star.svg";

interface Props {
  Input: boolean;
  star_lating: number;
}

const StarLating = ({ Input, star_lating }: Props) => {
  const [starState, setStarState] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  let arr1 = [];

  for (let i = 1; i < star_lating + 1; i++) {
    arr1.push(i);
  }

  const handleStarClick = (index: number) => {
    let clickStates = [...starState];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setStarState(clickStates);
  };

  useEffect(() => {
    let clickStates = [...starState];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= star_lating ? true : false;
    }
    setStarState(clickStates);
  }, [star_lating]);

  return (
    <Stars inputSize={Input}>
      {Input ? (
        [1, 2, 3, 4, 5].map((el, idx) => {
          return (
            <FaStar
              key={idx}
              size="50"
              onClick={() => handleStarClick(el)}
              className={starState[star_lating] ? "yellowStar" : ""}
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

  .star {
    margin-right: 5px;
  }

  & svg {
    width: ${({ inputSize }) => (inputSize ? "58px" : "22px")};
    height: ${({ inputSize }) => (inputSize ? "58px" : "22px")};
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
