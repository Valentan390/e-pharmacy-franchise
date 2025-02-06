import styled from "styled-components";
import Button from "../Button/Button/Button";
import { Link } from "react-router-dom";

export const FormAuth = styled.form<{ $isSignup: boolean }>`
  width: 100%;
  display: flex;
  gap: ${({ $isSignup }) => ($isSignup ? "28px" : "151px")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    width: 574px;
    gap: ${({ $isSignup }) => ($isSignup ? "63px" : "122px")};
    flex-direction: row;
    justify-content: start;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    width: 574px;
    gap: 14px;
    flex-direction: row;
    justify-content: start;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    width: calc((100% - 14px) / 2);
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const ButtonAuth = styled(Button)`
  width: 100%;

  display: flex;
  padding: 13px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  border-radius: 60px;
  background: ${({ theme }) => theme.colors.green};
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
  position: relative;
  color: ${({ theme }) => theme.colors.blackTransparent};
  font-feature-settings: "liga" off, "clig" off;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;

  &::before {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.black};
    border-radius: 2px;
    transition: width 0.3s linear;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.black};
    &::before {
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;
