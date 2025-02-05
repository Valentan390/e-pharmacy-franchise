import { FC } from "react";
import Logo from "../Logo/Logo";
import BurgerBtn from "../Button/BurgerBtn/BurgerBtn";
import { HeaderContainer, HeaderStyled } from "./Header.styled";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useMediaQueryResponsive } from "../../hooks";
import useCurrentUser from "../../hooks/useCurrentUser";
import NavBar from "../NavBar/NavBar";
import LogOutBtn from "../Button/LogOutBtn/LogOutBtn";

const Header: FC = () => {
  const { isDesktop } = useMediaQueryResponsive();
  const { isLogin } = useCurrentUser();

  return (
    <HeaderStyled>
      <HeaderContainer className="container">
        <Logo />
        {isLogin && isDesktop && <NavBar />}
        {isLogin && isDesktop && <LogOutBtn />}
        {isLogin && !isDesktop && <BurgerBtn />}
      </HeaderContainer>
      {isLogin && !isDesktop && <MobileMenu />}
    </HeaderStyled>
  );
};

export default Header;
