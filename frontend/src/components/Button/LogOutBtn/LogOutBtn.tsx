import { FC } from "react";
import { Logout_button } from "./LogOutBtn.styled";

const LogOutBtn: FC = () => {
  return (
    <Logout_button
      type="button"
      onClick={() => console.log("HELLO")}
      children={"Log out"}
    />
  );
};

export default LogOutBtn;
