import styled from "styled-components";
import Tablet_Mob_1x_webp from "../../images/mobile/white_round_pill_@1x.webp";
import Tablet_Mob_2x_webp from "../../images/mobile/white_round_pill_@2x.webp";
import Tablet_Mob_1x_png from "../../images/mobile/white_round_pill_@1x.png";
import Tablet_Mob_2x_png from "../../images/mobile/white_round_pill_@2x.png";
import Tablet_Tab_1x_webp from "../../images/tablet/white_round_pill_tab_@1x.webp";
import Tablet_Tab_2x_webp from "../../images/tablet/white_round_pill_tab_@2x.webp";
import Tablet_Tab_1x_png from "../../images/tablet/white_round_pill_tab_@1x.png";
import Tablet_Tab_2x_png from "../../images/tablet/white_round_pill_tab_@2x.png";

export const Banner_Container = styled.div`
  width: 100%;
  position: relative;

  @media screen and (min-width: 768px) {
    width: 614px;
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Banner_Tablet = styled.div`
  position: absolute;

  top: -56px;
  right: 20px;

  width: 95px;
  height: 93px;

  background-image: image-set(
    url(${Tablet_Mob_1x_webp}) type("image/webp") 1x,
    url(${Tablet_Mob_2x_webp}) type("image/webp") 2x,
    url(${Tablet_Mob_1x_png}) type("image/png") 1x,
    url(${Tablet_Mob_2x_png}) type("image/png") 2x
  );
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  @media screen and (min-width: 768px) {
    top: -104px;
    right: 19px;

    width: 179px;
    height: 175px;

    background-image: image-set(
      url(${Tablet_Tab_1x_webp}) type("image/webp") 1x,
      url(${Tablet_Tab_2x_webp}) type("image/webp") 2x,
      url(${Tablet_Tab_1x_png}) type("image/png") 1x,
      url(${Tablet_Tab_2x_png}) type("image/png") 2x
    );
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Banner_h2 = styled.h2`
  width: 100%;

  color: ${({ theme }) => theme.colors.black};
  font-size: 28px;
  font-weight: 600;
  line-height: 1.21;

  > span {
    color: ${({ theme }) => theme.colors.green};
  }

  @media screen and (min-width: 768px) {
    font-size: 54px;
    line-height: 1.11;
  }

  @media screen and (min-width: 1440px) {
  }
`;
