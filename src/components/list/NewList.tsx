import styled from "styled-components";
import CategoryMenu from "./CategoryMenu";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import QuizItem from "../common/QuizItem";
import DropDown from "../common/dropdown/DropDown";
import { OptionArrType } from "../../interface/common";

const DropDownOption: OptionArrType[] = [
  { option: "인기순", value: "인기순" },
  { option: "최신순", value: "최신순" },
];

const NewList = () => {
  const [changeTab, setCangeTab] = useState<boolean>(true);
  const [clickToggle, setClickToggle] = useState<string>("false");
  const [activetab, setActiveTab] = useState<number>(0);
  const [sort, setSort] = useState(DropDownOption[0].value);

  const ToggleValue = [
    {
      name: "전체",
      value: "false",
    },
    {
      name: "뱃지유저",
      value: "true",
    },
  ];

  const onClickTab = (idx: number) => {
    setActiveTab(idx);
  };

  useEffect(() => {
    if (changeTab === true) {
      setClickToggle("all");
    } else {
      setClickToggle("movement");
    }
  }, [changeTab]);

  const onChangeSort = (sort: string) => {
    const sortValue = sort;
    setSort(sortValue);
  };

  return (
    <Wrapper>
      <TitleContainer>
        <p>최신 문제집 인기순위</p>
      </TitleContainer>
      <CategoryMenu />
      <ClassificationWrapper>
        <ClassificationToggleContainer>
          {ToggleValue.map((name, idx) => (
            <ToggleDiv
              onClick={() => onClickTab(idx)}
              isState={activetab === idx}
              key={idx}
            >
              <ToggleState isState={activetab === idx} />
              <p>{name.name}</p>
            </ToggleDiv>
          ))}
        </ClassificationToggleContainer>
        <DropDown
          onChangeValue={onChangeSort}
          value={sort}
          options={DropDownOption}
        />
      </ClassificationWrapper>
      <ItemListWrapper>
        <QuizItem />
      </ItemListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  padding: 0px 203px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 28px;

  > p {
    font-weight: 400;
    font-size: 26px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const ClassificationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const ClassificationToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ToggleDiv = styled.div<{ isState: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  > p {
    font-size: 16px;
    font-weight: 510;
    color: ${({ theme, isState }) =>
      isState ? theme.colors.black : theme.colors.grayScale.Dark_Gray};
  }
`;

const ToggleState = styled.div<{ isState: boolean }>`
  width: 6px;
  height: 6px;
  margin-right: 16px;
  border-radius: 100%;
  background-color: ${({ theme, isState }) =>
    isState ? theme.colors.greanScale.grean : theme.colors.grayScale.Dark_Gray};
`;

const ItemListWrapper = styled.div`
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
`;

export default NewList;
