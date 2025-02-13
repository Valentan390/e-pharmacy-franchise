import styled from "styled-components";

export const Main = styled.main``;

export const Section = styled.section`
  padding: 40px 0 80px 0;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Container = styled.div`
  //  width: max-content;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
    flex-direction: row;
    align-items: stretch;
  }
`;
