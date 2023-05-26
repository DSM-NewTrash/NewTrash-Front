import styled from "styled-components";
import { useState, useMemo } from "react";
import arrow from "../../../assets/arrow.svg";
import { DropDownProps, OptionArrType } from "../../../interface/common";
import OutSideClickHandler from "./OutSideClick";

const DropDown = ({ onChangeValue, options, value }: DropDownProps) => {
  const [isFold, setIsFold] = useState<boolean>(false);

  const onClickOption = (clickedOption: string) => {
    onChangeValue(clickedOption);
    setIsFold(false);
  };

  const selectedValue = useMemo(() => {
    const index = options.findIndex((i: OptionArrType) => i.value === value);
    if (index === -1) return value;
    return options[index].option;
  }, [value]);

  return (
    <OutSideClickHandler onOutSideClick={() => setIsFold(false)}>
      <Wrapper>
        <label onClick={() => setIsFold(!isFold)}>
          <TitleValue>{selectedValue}</TitleValue>
          <ArrowImg isFold={isFold} src={arrow} alt=">" />
        </label>
        {isFold && (
          <ListWrapper>
            {options.map((item, idx) => (
              <ListOptionBox
                key={idx}
                onClick={() => onClickOption(item.value)}
              >
                {item.value}
              </ListOptionBox>
            ))}
          </ListWrapper>
        )}
      </Wrapper>
    </OutSideClickHandler>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 120px;
  height: 40px;
  > label {
    width: 120px;
    padding: 10px 0px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const TitleValue = styled.p`
  margin-right: 20px;
`;

const ArrowImg = styled.img<{ isFold: boolean }>`
  transition: all ease 200ms;
  transform: rotate(${(props) => (props.isFold ? "180" : "0")}deg);
`;

const ListWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 99;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2.5034px 10.0136px rgba(33, 33, 33, 0.25);
  border-radius: 15px;
`;

const ListOptionBox = styled.div`
  cursor: pointer;
  width: 100%;
  height: 34px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  border-radius: inherit;
`;

export default DropDown;
