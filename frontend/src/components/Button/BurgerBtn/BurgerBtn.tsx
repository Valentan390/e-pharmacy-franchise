import { FC } from "react";
import { Burger_Icon, BurgerBtn_Button } from "./BurgerBtn.styled";
import { useMediaQueryResponsive, useMobileMenu } from "../../../hooks";

const BurgerBtn: FC = () => {
  const { openMobileMenu } = useMobileMenu();
  const { isMobile } = useMediaQueryResponsive();
  const width = isMobile ? 32 : 36;
  const height = isMobile ? 26 : 30;

  return (
    <BurgerBtn_Button
      onClick={openMobileMenu}
      type="button"
      children={
        <Burger_Icon
          iconName="icon-align-justify"
          width={width}
          height={height}
        />
      }
    />
  );
};

export default BurgerBtn;
