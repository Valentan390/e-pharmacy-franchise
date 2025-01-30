import { FC } from "react";
import Logo from "../Logo/Logo";
import BurgerBtn from "../Button/BurgerBtn/BurgerBtn";
import { HeaderContainer, HeaderStyled } from "./Header.styled";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useMediaQueryResponsive } from "../../hooks";

const Header: FC = () => {
  const { isDesktop } = useMediaQueryResponsive();

  return (
    <HeaderStyled>
      <HeaderContainer className="container">
        <Logo />
        <BurgerBtn />
      </HeaderContainer>
      {!isDesktop && <MobileMenu />}
    </HeaderStyled>
  );
};

export default Header;
