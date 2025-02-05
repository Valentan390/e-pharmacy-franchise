import styled from "styled-components";
import Button from "../Button/Button";
import Icon from "../../Icon/Icon";

export const CloseBtn_Button = styled(Button)`
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 26px;
  right: 20px;

  @media screen and (min-width: 768px) {
    top: 37px;
    right: 32px;
  }
`;

export const CloseBtn_Icon = styled(Icon)`
  stroke: ${({ theme }) => theme.colors.white};
`;
