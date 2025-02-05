import { FC } from "react";
import { Banner_Container, Banner_h2, Banner_Tablet } from "./Banner.styled";

const Banner: FC = () => {
  return (
    <Banner_Container>
      <Banner_Tablet />
      <Banner_h2>
        Your medication, delivered Say goodbye to all{" "}
        <span>your healthcare</span> worries with us
      </Banner_h2>
    </Banner_Container>
  );
};

export default Banner;
