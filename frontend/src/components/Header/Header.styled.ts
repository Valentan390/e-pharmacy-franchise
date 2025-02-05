import styled from "styled-components";

export const HeaderStyled = styled.header`
  padding: 25px 0;

  @media screen and (min-width: 768px) {
    padding: 28px 0;
  }

  @media screen and (min-width: 1440px) {
    padding: 31px 0;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
