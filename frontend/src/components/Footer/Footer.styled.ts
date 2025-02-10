import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Icon from "../Icon/Icon";

export const Footer = styled.footer`
  padding: 20px 0;
  background: ${({ theme }) => theme.colors.green};

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const FooterContainer = styled.section``;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: start;
  align-items: start;

  flex-wrap: wrap;
  margin-bottom: 60px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 195px;
  }

  @media screen and (min-width: 1440px) {
    gap: 199px;
  }
`;

export const WrapperLogo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: start;
  align-items: start;

  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    width: 261px;
  }

  @media screen and (min-width: 1440px) {
    width: 311px;
  }
`;

export const FooterBanner = styled.p`
  max-width: 261px;

  color: ${({ theme }) => theme.colors.lightGray};
  font-size: 14px;
  font-weight: 400;
  line-height: 1.28;

  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 1.25;
  }

  @media screen and (min-width: 1440px) {
    max-width: 311px;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: start;
  align-items: start;

  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    width: 248px;

    gap: 32px;
  }

  @media screen and (min-width: 1440px) {
    width: calc(100% - 510px);
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const NavFooter = styled.nav`
  width: 100%;
  display: flex;
  gap: 12px;
  justify-content: start;
  align-items: center;

  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    gap: 32px;
    justify-content: end;
  }

  @media screen and (min-width: 1440px) {
    width: max-content;
    gap: 50px;
  }
`;

export const NavLinkFooter = styled(NavLink)`
  position: relative;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-weight: 600;
  line-height: 1.28;

  &.active::before {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.black};
    border-radius: 2px;
    animation: expandLine 0.3s linear forwards;
  }

  @keyframes expandLine {
    from {
      width: 2px;
    }
    to {
      width: 100%;
    }
  }
  @media screen and (min-width: 768px) {
    font-size: 16px;
    line-height: 1.25;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const IconsList = styled.ul`
  width: 100%;
  display: flex;
  gap: 12px;
  justify-content: start;
  align-items: center;

  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    gap: 12px;
    justify-content: end;
  }

  @media screen and (min-width: 1440px) {
    width: max-content;
  }
`;

export const IconItem = styled.li``;

export const IconLink = styled.a`
  padding: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lightGrayTransparent};

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const SocialMediaIcon = styled(Icon)`
  fill: ${({ theme }) => theme.colors.white};
  opacity: 0.8;
`;

export const Hr = styled.hr`
  border: none;
  height: 2px;
  background-color: rgba(247, 248, 250, 0.3);
  margin-bottom: 20px;
`;

export const FooterBottom = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: start;
  align-items: center;

  flex-wrap: wrap;

  margin: 0 auto;

  @media screen and (min-width: 768px) {
    width: max-content;
    gap: 20px;
  }

  @media screen and (min-width: 1440px) {
    gap: 24px;
  }
`;

export const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  font-weight: 400;
  line-height: 1;

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 1.28;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const FooterDivider = styled.div`
  width: 1px;
  height: 10px;
  flex-shrink: 0;

  border-radius: 8px;
  opacity: 0.2;
  background: ${({ theme }) => theme.colors.white};

  @media screen and (min-width: 768px) {
    height: 20px;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.white};
  font-size: 10px;
  font-weight: 400;
  line-height: 1;

  @media screen and (min-width: 768px) {
    font-size: 14px;
    line-height: 1.28;
  }

  @media screen and (min-width: 1440px) {
  }
`;
