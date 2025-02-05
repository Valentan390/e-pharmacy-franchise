import { FC } from "react";
import { Logout_button } from "./LogOutBtn.styled";
import { useAppDispatch } from "../../../hooks";
import { logoutThunk } from "../../../redux/authUser/authUserOperations";

const LogOutBtn: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Logout_button
      type="button"
      onClick={() => dispatch(logoutThunk())}
      children={"Log out"}
    />
  );
};

export default LogOutBtn;
