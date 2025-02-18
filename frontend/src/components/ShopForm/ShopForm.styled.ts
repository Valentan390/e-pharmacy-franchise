import styled from "styled-components";
import Button from "../Button/Button/Button";

export const Container = styled.div`
  width: 100%;
  padding: 40px 20px;
  border-radius: 27px;
  background: ${({ theme }) => theme.colors.white};

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
    width: 708px;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 12px;

  @media screen and (min-width: 768px) {
    font-size: 28px;
    line-height: 1.14;
  }

  @media screen and (min-width: 1440px) {
    line-height: 1.14;
    margin-bottom: 14px;
  }
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.grayDark};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28;
  margin-bottom: 40px;

  @media screen and (min-width: 768px) {
    max-width: 427px;
    font-size: 16px;
    line-height: 1.25;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Form = styled.form`
  width: 100%;

  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: start;

  flex-wrap: wrap;

  flex-direction: column;

  @media screen and (min-width: 768px) {
    gap: 24px;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  gap: 18px;
  justify-content: center;
  align-items: start;

  flex-wrap: wrap;

  flex-direction: column;

  @media screen and (min-width: 768px) {
    gap: 24px 14px;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }

  @media screen and (min-width: 1440px) {
  }
`;

// *********** BUTTON *********** //

export const ButtonShop = styled(Button)`
  display: inline-flex;
  padding: 13px 26px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  margin: 20px 0 0;

  border-radius: 60px;
  background: ${({ theme }) => theme.colors.green};

  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.28;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.darkGreen};
  }

  @media screen and (min-width: 768px) {
    padding: 13px 32px;
  }

  @media screen and (min-width: 1440px) {
  }
`;
