import { FC } from "react";
import { CloseBtn_Button, CloseBtn_Icon } from "./CloseBtn.styled";

interface ICloseBtnProps {
  onClick: () => void;
}

const CloseBtn: FC<ICloseBtnProps> = ({ onClick }) => {
  return (
    <CloseBtn_Button
      onClick={onClick}
      type="button"
      children={<CloseBtn_Icon iconName="icon-x" width={32} height={32} />}
    />
  );
};

export default CloseBtn;
