import { useQuery } from "react-query";
import styled from "styled-components";
import { getMyProblem } from "../../utils/api/user";
import { useApiError } from "../../hooks/useApiError";

const MyCreateList = () => {
  const { handleError } = useApiError();

  const { data: my } = useQuery("my", () => getMyProblem(), {
    onError: handleError,
  });

  return (
    <Wrapper>
      <h1>내가 출제한 문제집</h1>
      <CreateProblemList>
        {my?.data.quizResponses.map((item) => (
          <CreateProblemContainer>
            <img width={150} src={item.image} alt="" />
            <ProblemInfo>
              <h1>{item.title}</h1>
              <CategoryItem>
                <p>{item.category}</p>
              </CategoryItem>
              <p>{item.introduction}</p>
            </ProblemInfo>
          </CreateProblemContainer>
        ))}
      </CreateProblemList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 680px;
  height: 700px;
  padding: 35px 40px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 8px rgba(33, 33, 33, 0.25);
  border-radius: 20px;

  > h1 {
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 18px;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const CreateProblemList = styled.div`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: scroll;
`;

const CreateProblemContainer = styled.div`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  height: 130px;
  display: flex;
  gap: 20px;
  border: 1px solid #d7d7d7;
  box-shadow: 0px 1.42439px 5.69756px rgba(33, 33, 33, 0.25);
  border-radius: 4px;
`;

const ImgDiv = styled.div`
  width: 130px;
  background-color: black;
`;

const ProblemInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px 25px 18px 0px;
  background-color: ${({ theme }) => theme.colors.white};

  > h1 {
    background-color: ${({ theme }) => theme.colors.white};
    margin-bottom: 4px;
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
  }

  > p {
    background-color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.TextColor};
  }
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 25px;
  border: 2px solid ${({ theme }) => theme.colors.greanScale.main};
  border-radius: 20px;
  margin-bottom: 14px;

  > p {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.greanScale.main};
  }
`;

export default MyCreateList;
