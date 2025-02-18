import styled from "styled-components";
import { getColor } from "../../../shared/functions";

export const Label = styled.label`
  width: 100%;
  position: relative;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: start;
  flex-wrap: wrap;
  flex-direction: column;

  color: ${({ theme }) => theme.colors.black};
  font-feature-settings: "liga" off, "clig" off;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.28;

  @media screen and (min-width: 768px) {
    width: calc((100% - 28px) / 3);
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const LabelText = styled.span`
  margin-left: 18px;
`;

export const Input = styled.input<{ $errors: boolean; $isValid: boolean }>`
  width: 100%;
  padding: 13px 18px;

  color: ${({ theme }) => theme.colors.black};
  font-feature-settings: "liga" off, "clig" off;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;

  border-radius: 27px;
  border: 1px solid
    ${({ theme, $errors, $isValid }) => getColor(theme, $errors, $isValid)};
  background: ${({ theme }) => theme.colors.white};

  transition: border-color ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition};

  &::placeholder {
    color: ${({ theme }) => theme.colors.blackTransparent};
    font-feature-settings: "liga" off, "clig" off;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
  }

  &:hover {
    border-color: ${({ theme, $errors, $isValid }) =>
      getColor(theme, $errors, $isValid)};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.blackTransparent10};
    // outline: none;
  }

  &:focus {
    border-color: ${({ theme, $errors, $isValid }) =>
      getColor(theme, $errors, $isValid)};
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.greenTransparent50};
    // outline: none;
  }

  &:active {
    border-color: ${({ theme, $errors, $isValid }) =>
      getColor(theme, $errors, $isValid)};
  }

  &:-webkit-autofill {
    background: ${({ theme }) => theme.colors.white} !important;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.black} !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Error = styled.p`
  position: absolute;
  bottom: -20%;
  left: 6%;

  color: ${({ theme }) => theme.colors.red};
  font-size: 10px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.2px;

  @media screen and (min-width: 768px) {
    bottom: -36%;
  }

  @media screen and (min-width: 1440px) {
  }
`;
