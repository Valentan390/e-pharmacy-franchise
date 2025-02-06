import styled from "styled-components";
import Button from "../../Button/Button/Button";
import Icon from "../../Icon/Icon";
import { getColor } from "../../../shared/functions";

export const Label = styled.label`
  width: 100%;
  position: relative;

  @media screen and (min-width: 768px) {
    width: calc((100% - 14px) / 2);
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Input = styled.input<{ $errors: boolean; $isValid: boolean }>`
  width: 100%;
  padding: 13px 18px;

  color: ${({ theme }) => theme.colors.black};
  font-feature-settings: "liga" off, "clig" off;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;

  border-radius: 60px;
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
    line-height: 1, 5;
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

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const ButtonEye = styled(Button)`
  position: absolute;
  top: 50%;
  left: 90%;
  transform: translate(-50%, -50%);

  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const IconEye = styled(Icon)<{ $errors: boolean; $isValid: boolean }>`
  fill: none;
  stroke: ${({ theme, $errors, $isValid }) =>
    $errors
      ? theme.colors.red
      : $isValid
      ? theme.colors.green
      : theme.colors.blackTransparent};
`;

export const Message = styled.p<{ $error: boolean }>`
  position: absolute;
  left: 5%;
  bottom: -28%;

  color: ${({ theme, $error }) =>
    $error ? theme.colors.red : theme.colors.green};
  font-size: 10px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.2px;

  @media screen and (min-width: 768px) {
    font-size: 12px;
    line-height: 1.16;
    letter-spacing: -0.24px;
  }
`;
