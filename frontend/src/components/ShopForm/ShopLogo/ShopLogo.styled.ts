import styled from "styled-components";
import { getColor } from "../../../shared/functions";
import Icon from "../../Icon/Icon";

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

export const LabelLogo = styled.label<{ $errors: boolean; $isValid: boolean }>`
  width: 100%;
  position: relative;
  padding: 13px 18px;
  cursor: pointer;
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
