import { FC } from "react";
import { Burger_Icon, BurgerBtn_Button } from "./BurgerBtn.styled";

export interface IBurgerBtn {
  onClick: () => void;
}

const BurgerBtn: FC<IBurgerBtn> = ({ onClick }) => {
  return (
    <BurgerBtn_Button
      onClick={onClick}
      type="button"
      children={
        <Burger_Icon iconName="icon-align-justify" width={32} height={26} />
      }
    />
  );
};

export default BurgerBtn;
