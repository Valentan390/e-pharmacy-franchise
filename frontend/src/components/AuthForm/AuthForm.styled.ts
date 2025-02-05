import styled from "styled-components";
import Button from "../Button/Button/Button";
import { Link } from "react-router-dom";

export const FormAuth = styled.form`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const ButtonAuth = styled(Button)<{ $isSignup: boolean }>`
  width: 100%;

  display: flex;
  padding: 13px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 60px;
  background: ${({ theme }) => theme.colors.green};
  margin-top: ${({ $isSignup }) => ($isSignup ? "12px" : "135px")};

  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 500;
  line-height: 1.28;

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.darkGreen};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const LinkAuth = styled(Link)`
  color: ${({ theme }) => theme.colors.blackTransparent};
  font-feature-settings: "liga" off, "clig" off;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;
