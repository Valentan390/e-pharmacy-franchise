import { FC } from "react";
import * as s from "./Logo.styled";
import { LogoProps } from "../../types";

const Logo: FC<LogoProps> = ({ footer }) => {
  return (
    <s.Logo_Link to={"/"} $isFooter={footer}>
      <s.Logo_div $isFooter={footer} />
      E-Pharmacy
    </s.Logo_Link>
  );
};

export default Logo;
