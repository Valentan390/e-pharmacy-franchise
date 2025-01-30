import { FC } from "react";
import { Burger_Icon, BurgerBtn_Button } from "./BurgerBtn.styled";
import { useMobileMenu } from "../../../hooks/useMobileMenu";

const BurgerBtn: FC = () => {
  const { openMobileMenu } = useMobileMenu();
  return (
    <BurgerBtn_Button
      onClick={openMobileMenu}
      type="button"
      children={
        <Burger_Icon iconName="icon-align-justify" width={32} height={26} />
      }
    />
  );
};

export default BurgerBtn;
