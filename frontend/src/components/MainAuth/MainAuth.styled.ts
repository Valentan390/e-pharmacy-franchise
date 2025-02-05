import styled from "styled-components";
import Element_Mob_Webp_1x from "../../images/mobile/elements_mob_1@x.webp";
import Element_Mob_Webp_2x from "../../images/mobile/elements_mob_2@x.webp";
import Element_Mob_Png_1x from "../../images/mobile/elements_mob_1@x.png";
import Element_Mob_Png_2x from "../../images/mobile/elements_mob_2@x.png";

export const Main = styled.main``;

export const Section = styled.section`
  padding: 81px 0 191px;

  background-image: image-set(
    url(${Element_Mob_Webp_1x}) type("image/webp") 1x,
    url(${Element_Mob_Webp_2x}) type("image/webp") 2x,
    url(${Element_Mob_Png_1x}) type("image/png") 1x,
    url(${Element_Mob_Png_2x}) type("image/png") 2x
  );
  background-repeat: no-repeat;
  background-size: auto;
  background-position: bottom right;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;
