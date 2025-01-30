import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav_nav = styled.nav`
  width: max-content;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Nav_div = styled.div`
  padding: 8px;

  border-radius: 60px;
  border: 2px solid ${({ theme }) => theme.colors.grayLight};
  background: ${({ theme }) => theme.colors.white};

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Nav_NavLink = styled(NavLink)`
  display: flex;
  gap: 10px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 1;

  &.active {
    border-radius: 24px;
    background: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
  }

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

// export const Nav_ = styled.``
// export const Nav_ = styled.``
// export const Nav_ = styled.``
// export const Nav_ = styled.``
