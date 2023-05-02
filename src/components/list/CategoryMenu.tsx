import styled from "styled-components";
import { CategoryConstants } from "../constants";

const CategoryMenu = () => {
  return (
    <Wrapper>
      {CategoryConstants.map((item, idx) => (
        <CategoryItem key={idx}>
          <p>{item}</p>
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

const CategoryItem = styled.div`
  cursor: pointer;
  width: 110px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grayScale.Gray};
  border-radius: 10px;

  > p {
    font-weight: 400;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export default CategoryMenu;
