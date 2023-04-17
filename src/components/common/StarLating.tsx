import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

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
      {Input
        ? [1, 2, 3, 4, 5].map((el, idx) => {
            return (
              <FaStar
                key={idx}
                size="50"
                onClick={() => handleStarClick(el)}
                className={starState[star_lating] ? "yellowStar" : ""}
              />
            );
          })
        : [1, 2, 3, 4, 5].map((idx) => {
            console.log(star_lating);
            return (
              <FaStar
                key={idx}
                size="50"
                className={starState[star_lating] ? "yellowStar" : ""}
              />
            );
          })}
    </Stars>
  );
};

const Stars = styled.div<{ inputSize: boolean }>`
  display: flex;

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
