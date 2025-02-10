import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo_Mob_1x from "../../images/mobile/logo_mob_1@x.webp";
import Logo_Mob_2x from "../../images/mobile/logo_mob_2@x.webp";
import Logo_Mob_1x_png from "../../images/mobile/logo_mob_1@x.png";
import Logo_Mob_2x_png from "../../images/mobile/logo_mob_2@x.png";
import Logo_Tab_1x_webp from "../../images/tablet/Mask_group_Tab_@1x.webp";
import Logo_Tab_2x_webp from "../../images/tablet/Mask_group_Tab_@2x.webp";
import Logo_Tab_1x_png from "../../images/tablet/Mask_group_Tab_@1x.png";
import Logo_Tab_2x_png from "../../images/tablet/Mask_group_Tab_@2x.png";
import Logo_Footer_1x_webp from "../../images/mobile/logo_footer_mob_@1x.webp";
import Logo_Footer_2x_webp from "../../images/mobile/logo_footer_mob_@2x.webp";
import Logo_Footer_1x_png from "../../images/mobile/logo_footer_mob_@1x.png";
import Logo_Footer_2x_png from "../../images/mobile/logo_footer_mob_@2x.png";
import Logo_Footer_Tab_1x_webp from "../../images/tablet/logo_tab_footer_@1x.webp";
import Logo_Footer_Tab_2x_webp from "../../images/tablet/logo_tab_footer_@2x.webp";
import Logo_Footer_Tab_1x_png from "../../images/tablet/logo_tab_footer_@1x.png";
import Logo_Footer_Tab_2x_png from "../../images/tablet/logo_tab_footer_@2x.png";

export const Logo_Link = styled(Link)<{ $isFooter?: boolean }>`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  color: ${({ theme, $isFooter }) =>
    $isFooter ? theme.colors.white : theme.colors.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;

  @media screen and (min-width: 768px) {
    gap: 14px;

    font-size: 20px;
    letter-spacing: -0.6px;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Logo_div = styled.div<{ $isFooter?: boolean }>`
  width: 32px;
  height: 32px;

  background-image: image-set(
    url(${({ $isFooter }) => ($isFooter ? Logo_Footer_1x_webp : Logo_Mob_1x)})
      type("image/webp") 1x,
    url(${({ $isFooter }) => ($isFooter ? Logo_Footer_2x_webp : Logo_Mob_2x)})
      type("image/webp") 2x,
    url(${({ $isFooter }) =>
        $isFooter ? Logo_Footer_1x_png : Logo_Mob_1x_png})
      type("image/png") 1x,
    url(${({ $isFooter }) =>
        $isFooter ? Logo_Footer_2x_png : Logo_Mob_2x_png})
      type("image/png") 2x
  );
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  @media screen and (min-width: 768px) {
    width: 44px;
    height: 44px;

    background-image: image-set(
      url(${({ $isFooter }) =>
          $isFooter ? Logo_Footer_Tab_1x_webp : Logo_Tab_1x_webp})
        type("image/webp") 1x,
      url(${({ $isFooter }) =>
          $isFooter ? Logo_Footer_Tab_2x_webp : Logo_Tab_2x_webp})
        type("image/webp") 2x,
      url(${({ $isFooter }) =>
          $isFooter ? Logo_Footer_Tab_1x_png : Logo_Tab_1x_png})
        type("image/png") 1x,
      url(${({ $isFooter }) =>
          $isFooter ? Logo_Footer_Tab_2x_png : Logo_Tab_2x_png})
        type("image/png") 2x
    );
  }

  @media screen and (min-width: 1440px) {
  }
`;
