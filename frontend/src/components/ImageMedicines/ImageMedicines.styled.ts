import styled from "styled-components";

import Image_Mob_1x_webp from "../../images/mobile/Rounded_rectangle_mob_@1x.webp";
import Image_Mob_2x_webp from "../../images/mobile/Rounded_rectangle_mob_@2x.webp";
import Image_Mob_1x_jpg from "../../images/mobile/Rounded_rectangle_mob_@1x.jpg";
import Image_Mob_2x_jpg from "../../images/mobile/Rounded_rectangle_mob_@2x.jpg";

import Image_Tab_1x_webp from "../../images/tablet/Rounded_rectangle_tab_@1x.webp";
import Image_Tab_2x_webp from "../../images/tablet/Rounded_rectangle_tab_@2x.webp";
import Image_Tab_1x_jpg from "../../images/tablet/Rounded_rectangle_tab_@1x.jpg";
import Image_Tab_2x_jpg from "../../images/tablet/Rounded_rectangle_tab_@2x.jpg";

import Image_Des_1x_webp from "../../images/desktop/Rounded_rectangle_des_@1x.webp";
import Image_Des_2x_webp from "../../images/desktop/Rounded_rectangle_das_@2x.webp";
import Image_Des_1x_jpg from "../../images/desktop/Rounded_rectangle_des_@1x.jpg";
import Image_Des_2x_jpg from "../../images/desktop/Rounded_rectangle_das_@2x.jpg";

export const Container = styled.div`
  width: 100%;
  height: 470px;

  border-radius: 27px;

  background-image: image-set(
    url(${Image_Mob_1x_webp}) type("image/webp") 1x,
    url(${Image_Mob_2x_webp}) type("image/webp") 2x,
    url(${Image_Mob_1x_jpg}) 1x,
    url(${Image_Mob_2x_jpg}) 2x
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  @media screen and (min-width: 768px) {
    height: 550px;

    background-image: image-set(
      url(${Image_Tab_1x_webp}) type("image/webp") 1x,
      url(${Image_Tab_2x_webp}) type("image/webp") 2x,
      url(${Image_Tab_1x_jpg}) 1x,
      url(${Image_Tab_2x_jpg}) 2x
    );
  }

  @media screen and (min-width: 1440px) {
    width: calc(100% - 728px);
    height: auto;

    background-image: image-set(
      url(${Image_Des_1x_webp}) type("image/webp") 1x,
      url(${Image_Des_2x_webp}) type("image/webp") 2x,
      url(${Image_Des_1x_jpg}) 1x,
      url(${Image_Des_2x_jpg}) 2x
    );
  }
`;
