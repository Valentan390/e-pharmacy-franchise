import { FC } from "react";
import * as s from "./Banner.styled";

const Banner: FC = () => {
  return (
    <s.Banner_Container>
      <s.Banner_Tablet />
      <s.Banner_h2>
        Your medication, delivered Say goodbye to all{" "}
        <span>your healthcare</span> worries with us
      </s.Banner_h2>
    </s.Banner_Container>
  );
};

export default Banner;
