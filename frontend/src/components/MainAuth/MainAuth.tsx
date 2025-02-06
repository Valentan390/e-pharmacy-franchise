import { FC } from "react";
import * as s from "./MainAuth.styled";
import { MainAuthProps } from "../../types";

const MainAuth: FC<MainAuthProps> = ({ children }) => {
  return (
    <s.Main>
      <s.Section>
        <s.Container className="container">{children}</s.Container>
      </s.Section>
    </s.Main>
  );
};

export default MainAuth;
