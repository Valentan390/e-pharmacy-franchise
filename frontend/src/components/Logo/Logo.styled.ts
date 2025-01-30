import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo_Mob_1x from "../../images/mobile/logo_mob_1@x.webp";
import Logo_Mob_2x from "../../images/mobile/logo_mob_2@x.webp";
import Logo_Mob_1x_png from "../../images/mobile/logo_mob_1@x.png";
import Logo_Mob_2x_png from "../../images/mobile/logo_mob_2@x.png";

export const Logo_Link = styled(Link)`
  width: max-content;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.48px;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

export const Logo_div = styled.div`
  width: 32px;
  height: 32px;

  background-image: image-set(
    url(${Logo_Mob_1x}) type("image/webp") 1x,
    url(${Logo_Mob_2x}) type("image/webp") 2x,
    url(${Logo_Mob_1x_png}) type("image/png") 1x,
    url(${Logo_Mob_2x_png}) type("image/png") 2x
  );
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1440px) {
  }
`;

// export const Logo_ = styled.``
// export const Logo_ = styled.``
// export const Logo_ = styled.``
// export const Logo_ = styled.``
// export const Logo_ = styled.``
