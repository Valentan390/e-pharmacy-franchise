import styled from "styled-components";
import Button from "../Button/Button";
import Icon from "../../Icon/Icon";

export const BurgerBtn_Button = styled(Button)`
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Burger_Icon = styled(Icon)`
  stroke: ${({ theme }) => theme.colors.green};
`;
