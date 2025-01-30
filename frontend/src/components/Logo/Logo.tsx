import { FC } from "react";
import { Logo_div, Logo_Link } from "./Logo.styled";

const Logo: FC = () => {
  return (
    <Logo_Link to={"/"}>
      <Logo_div />
      E-Pharmacy
    </Logo_Link>
  );
};

export default Logo;
