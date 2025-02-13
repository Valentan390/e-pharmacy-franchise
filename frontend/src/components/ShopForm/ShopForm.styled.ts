import styled from "styled-components";
import { getColor } from "../../shared/functions";
import Icon from "../Icon/Icon";
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
  gap: 12px;
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

export const Label = styled.label`
  width: 100%;

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

export const Input = styled.input`
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
  background: #fff;

  transition: border-color ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition};

  &::placeholder {
    color: ${({ theme }) => theme.colors.blackTransparent};
    font-feature-settings: "liga" off, "clig" off;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
  }

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

// *********  LOGO  ************* //

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: start;
  align-items: start;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    width: calc((100% - 28px) / 3);
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const LogoText = styled.p`
  color: ${({ theme }) => theme.colors.black};
  font-feature-settings: "liga" off, "clig" off;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.28;

  margin-left: 18px;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const LabelLogo = styled.label`
  width: 100%;
  padding: 13px 18px;

  display: flex;
  gap: 8px;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;

  color: ${({ theme }) => theme.colors.blackTransparent};
  font-feature-settings: "liga" off, "clig" off;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;

  border-radius: 27px;
  border: 1px solid
    ${({ theme, $errors, $isValid }) => getColor(theme, $errors, $isValid)};
  background: #fff;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const LogoIcon = styled(Icon)`
  stroke: ${({ theme }) => theme.colors.green};
`;

export const InputFileHidden = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  line-height: 0;
  overflow: hidden;
  padding: 0;
  margin: 0;
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
