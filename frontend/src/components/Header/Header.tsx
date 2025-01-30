import { FC, useState } from "react";
import Logo from "../Logo/Logo";
import BurgerBtn from "../Button/BurgerBtn/BurgerBtn";
import { HeaderContainer, HeaderStyled } from "./Header.styled";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header: FC = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  return (
    <HeaderStyled>
      <HeaderContainer className="container">
        <Logo />
        <BurgerBtn onClick={() => setIsOpenMobileMenu(true)} />
      </HeaderContainer>
      <MobileMenu
        isOpen={isOpenMobileMenu}
        onClose={() => setIsOpenMobileMenu(false)}
      />
    </HeaderStyled>
  );
};

export default Header;
