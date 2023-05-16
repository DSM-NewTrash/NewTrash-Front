import { useState } from "react";
import styled from "styled-components";
import { CategoryConstants } from "../constants";

const CategoryMenu = () => {
  const [activetab, setActiveTab] = useState<number>(0);
  const [itemValue, setItemValue] = useState<string>("POLLUTION");

  const onClickTab = (idx: number, value: string) => {
    setActiveTab(idx);
    setItemValue(value);
  };

  return (
    <Wrapper>
      {CategoryConstants.map((item, idx) => (
        <CategoryItem
          onClick={() => onClickTab(idx, item.value)}
          isState={activetab === idx}
          key={idx}
        >
          <p>{item.name}</p>
        </CategoryItem>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 28px;
`;

const CategoryItem = styled.div<{ isState: boolean }>`
  cursor: pointer;
  width: 110px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid
    ${({ theme, isState }) =>
      isState
        ? theme.colors.greanScale.Light_Grean
        : theme.colors.grayScale.Gray};
  border-radius: 10px;

  > p {
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme, isState }) =>
      isState ? theme.colors.greanScale.Light_Grean : theme.colors.black};
  }
`;

export default CategoryMenu;
