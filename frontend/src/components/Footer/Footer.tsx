import { FC } from "react";
import * as s from "./Footer.styled";
import Logo from "../Logo/Logo";
import { navItems } from "../../constants";
import { iconItems } from "../../constants/iconItems";
import { useMediaQueryResponsive } from "../../hooks";

const Footer: FC = () => {
  const { isMobile } = useMediaQueryResponsive();
  const iconWidth = isMobile ? 20 : 28;
  const iconHeight = isMobile ? 20 : 28;
  return (
    <s.Footer>
      <s.FooterContainer className="container">
        <s.ContentWrapper>
          <s.WrapperLogo>
            <Logo footer />
            <s.FooterBanner>
              Get the medicine to help you feel better, get back to your active
              life, and enjoy every moment.
            </s.FooterBanner>
          </s.WrapperLogo>

          <s.Wrapper>
            <s.NavFooter>
              {navItems.map(({ id, to, text }) => (
                <s.NavLinkFooter key={id} to={to}>
                  {text}
                </s.NavLinkFooter>
              ))}
            </s.NavFooter>

            <s.IconsList>
              {iconItems.map(({ id, href, icon }) => (
                <s.IconItem key={id}>
                  <s.IconLink
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <s.SocialMediaIcon
                      iconName={icon}
                      width={iconWidth}
                      height={iconHeight}
                    />
                  </s.IconLink>
                </s.IconItem>
              ))}
            </s.IconsList>
          </s.Wrapper>
        </s.ContentWrapper>

        <s.Hr />

        <s.FooterBottom>
          <s.FooterText>© E-Pharmacy 2023. All Rights Reserved</s.FooterText>
          <s.FooterDivider />
          <s.FooterLink
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </s.FooterLink>
          <s.FooterDivider />
          <s.FooterLink
            href="/terms-conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms & Conditions
          </s.FooterLink>
        </s.FooterBottom>
      </s.FooterContainer>
    </s.Footer>
  );
};

export default Footer;
