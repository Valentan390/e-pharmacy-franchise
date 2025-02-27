import styled from "styled-components";
import Button from "../Button/Button";

export const Logout_button = styled(Button)`
  display: inline-flex;
  padding: 13px 28px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 60px;
  border: 1px solid ${({ theme }) => theme.colors.grayTransparent};
  background: transparent;

  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 400;
  line-height: 1;

  @media screen and (min-width: 1440px) {
    padding: 15px 32px;

    border: 1px solid ${({ theme }) => theme.colors.greenTransparent50};

    color: ${({ theme }) => theme.colors.green};

    &:hover,
    &:focus {
      background: #59b17a;
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
