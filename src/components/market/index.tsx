import { useEffect, useState } from "react";
import styled from "styled-components";
import MarketModal from "./MarketModal";
import { hfive, mfive, mone, mthree, mtwo } from "../../assets/market/index";
import { useMarketExChange } from "../../utils/api/market";
import { useApiError } from "../../hooks/useApiError";
import { useQuery } from "react-query";
import { getMyExpLevel } from "../../utils/api/user";

const money = [
  {
    value: 5000,
    name: "5,000원",
    img: <img src={hfive} alt="" />,
  },
  {
    value: 10000,
    name: "10,000원",
    img: <img src={mone} alt="" />,
  },
  {
    value: 20000,
    name: "20,000원",
    img: <img src={mtwo} alt="" />,
  },
  {
    value: 30000,
    name: "30,000원",
    img: <img src={mthree} alt="" />,
  },
  {
    value: 50000,
    name: "50,000원",
    img: <img src={mfive} alt="" />,
  },
];

const Market = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [btnState, setBtnState] = useState<boolean>(true);
  const [cur, setCur] = useState<number>(0);

  const { handleError } = useApiError();

  const { data: MyPage, refetch } = useQuery(
    ["mypage"],
    () => getMyExpLevel(),
    {
      onError: handleError,
    }
  );

  const { mutate: market } = useMarketExChange();

  const onClick = (num: number) => {
    setCur(num);
    console.log(cur);

    if (MyPage?.data.point! > money[cur].value) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  };

  const BtnClick = () => {
    market(money[cur].value);
    setModalOpen(true);
  };

  useEffect(() => {
    refetch();
  }, [modalOpen]);

  return (
    <Wrapper>
      <CardContainer>
        <h1>문화상품권</h1>
        {money[cur].img}
      </CardContainer>
      <ChoiceMoneyWrapper>
        <ChoiceMoneyHeader>
          <h1>금액선택</h1>
          <p>ex: 5000P = 5000원</p>
        </ChoiceMoneyHeader>
        <ChoiceMoneyContainer>
          {money.map((item, idx) => (
            <ChoiceMoney
              key={idx}
              state={!(idx * 1 === cur)}
              onClick={() => onClick(idx * 1)}
            >
              <p>{item.name}</p>
            </ChoiceMoney>
          ))}
        </ChoiceMoneyContainer>
        <ButtonWrapper>
          <p>현재 내 포인트: {MyPage?.data.point}P</p>
          <NextButton onClick={BtnClick} disabled={btnState}>
            교환하기
          </NextButton>
        </ButtonWrapper>
      </ChoiceMoneyWrapper>
      {modalOpen && <MarketModal setModalState={setModalOpen} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 40px;
  width: 1120px;
  display: flex;
  justify-content: space-between;
`;

const CardContainer = styled.div`
  > h1 {
    margin-bottom: 50px;
    font-size: 20px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.black};
  }

  .card {
    width: 300px;
    height: 500px;
    border: 1px solid black;
    background-color: white;
  }
`;

const ChoiceMoneyWrapper = styled.div`
  width: 700px;
`;

const ChoiceMoneyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > h1 {
    font-size: 22px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.black};
  }

  > p {
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.grayScale.Very_Dark_Gray};
  }
`;

const ChoiceMoneyContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-bottom: 194px;
`;

const ChoiceMoney = styled.div<{ state: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 216px;
  height: 120px;
  box-shadow: 0px 1.94788px 7.79153px rgba(33, 33, 33, 0.25);
  border-radius: 10px;
  border: 2px solid
    ${({ theme, state }) =>
      state ? theme.colors.white : theme.colors.greanScale.main};

  > p {
    font-size: 30px;
    font-weight: 400;
    color: ${({ theme, state }) =>
      state ? theme.colors.black : theme.colors.greanScale.main};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > p {
    font-size: 18px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.greanScale.grean};
    margin-bottom: 10px;
  }
`;

const NextButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.greanScale.main};
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};

  :disabled {
    color: ${({ theme }) => theme.colors.greanScale.main};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export default Market;
