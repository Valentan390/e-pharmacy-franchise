import { FC, MouseEventHandler, useCallback, useEffect } from "react";
import CloseBtn from "../Button/CloseBtn/CloseBtn";
import NavBar from "../NavBar/NavBar";
import LogOutBtn from "../Button/LogOutBtn/LogOutBtn";
import { MobileMenu_Backdrop, MobileMenu_Wrapper } from "./MobileMenu.styled";

export interface IMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<IMobileMenuProps> = ({ isOpen, onClose }) => {
  const handlerBackdropClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <MobileMenu_Backdrop $isOpen={isOpen} onClick={handlerBackdropClick} />
      <MobileMenu_Wrapper $isOpen={isOpen}>
        <CloseBtn onClick={onClose} />
        <NavBar />
        <LogOutBtn />
      </MobileMenu_Wrapper>
    </>
  );
};

export default MobileMenu;
