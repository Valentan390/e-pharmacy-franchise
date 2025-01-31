import { FC } from "react";
import { CloseBtn_Button, CloseBtn_Icon } from "./CloseBtn.styled";
import { useMobileMenu } from "../../../hooks";

const CloseBtn: FC = () => {
  const { closeMobileMenu } = useMobileMenu();
  return (
    <CloseBtn_Button
      onClick={closeMobileMenu}
      type="button"
      children={<CloseBtn_Icon iconName="icon-x" width={32} height={32} />}
    />
  );
};

export default CloseBtn;
