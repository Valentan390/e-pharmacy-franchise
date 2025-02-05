import { FC, ReactNode } from "react";
import { Container, Main, Section } from "./MainAuth.styled";

export interface MainAuthProps {
  children: ReactNode;
}

const MainAuth: FC<MainAuthProps> = ({ children }) => {
  return (
    <Main>
      <Section>
        <Container className="container">{children}</Container>
      </Section>
    </Main>
  );
};

export default MainAuth;
