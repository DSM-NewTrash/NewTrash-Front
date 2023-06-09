import styled from "styled-components";
import { useState, useEffect } from "react";
import QuizItem from "../common/QuizItem";
import { useApiError } from "../../hooks/useApiError";
import { useQuery } from "react-query";
import { getProblemList } from "../../utils/api/problem";
import { CategoryConstants } from "../constants";

const NewList = () => {
  const [clickToggle, setClickToggle] = useState<boolean>(false);
  const [activetab, setActiveTab] = useState<number>(0);
  const [categoryTab, setCategoryTab] = useState<number>(0);
  const [itemValue, setItemValue] = useState<string>("POLLUTION");

  const ToggleValue = [
    {
      name: "전체",
      value: false,
    },
    {
      name: "뱃지유저",
      value: true,
    },
  ];

  const onClickTab = (idx: number) => {
    setActiveTab(idx);
    setClickToggle(ToggleValue[idx].value);
    console.log(clickToggle);
  };

  const { handleError } = useApiError();

  const { data: list, refetch } = useQuery(
    "list",
    () =>
      getProblemList({
        option: "RECENCY",
        category: itemValue,
        auth: clickToggle,
      }),
    {
      onError: handleError,
    }
  );

  const onClickCategory = (idx: number, value: string) => {
    setCategoryTab(idx);
    setItemValue(value);
    console.log(itemValue, "1");
  };

  useEffect(() => {
    refetch(); // itemValue가 변경될 때마다 데이터 다시 가져오기
  }, [itemValue, clickToggle]);

  return (
    <Wrapper>
      <TitleContainer>
        <p>최신 문제집 </p>
      </TitleContainer>
      <CategoryWrapper>
        {CategoryConstants.map((item, idx) => (
          <CategoryItem
            onClick={() => onClickCategory(idx, item.value)}
            isState={categoryTab === idx}
            key={idx}
          >
            <p>{item.name}</p>
          </CategoryItem>
        ))}
      </CategoryWrapper>
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
      </ClassificationWrapper>
      <ItemListWrapper>
        {list?.data.quizResponses.map((item, idx) => (
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
        ))}
      </ItemListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: 65px;
  display: flex;
  flex-direction: column;
  padding: 0px 135px;
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
  margin-bottom: 60px;
`;

const CategoryWrapper = styled.div`
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

export default NewList;
