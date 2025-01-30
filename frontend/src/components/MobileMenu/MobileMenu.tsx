import { FC, MouseEventHandler, useCallback, useEffect } from "react";
import CloseBtn from "../Button/CloseBtn/CloseBtn";
import NavBar from "../NavBar/NavBar";
import LogOutBtn from "../Button/LogOutBtn/LogOutBtn";
import { MobileMenu_Backdrop, MobileMenu_Wrapper } from "./MobileMenu.styled";
import { useMobileMenu } from "../../hooks/useMobileMenu";

const MobileMenu: FC = () => {
  const { isMobileMenu, closeMobileMenu } = useMobileMenu();
  const handlerBackdropClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        closeMobileMenu();
      }
    },
    [closeMobileMenu]
  );

  useEffect(() => {
    if (isMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenu]);

  return (
    <>
      <MobileMenu_Backdrop
        $isOpen={isMobileMenu}
        onClick={handlerBackdropClick}
      />
      <MobileMenu_Wrapper $isOpen={isMobileMenu}>
        <CloseBtn />
        <NavBar />
        <LogOutBtn />
      </MobileMenu_Wrapper>
    </>
  );
};

export default MobileMenu;
