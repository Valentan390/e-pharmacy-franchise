import { FC } from "react";
import Banner from "../../components/Banner/Banner";
import AuthForm from "../../components/AuthForm/AuthForm";
import MainAuth from "../../components/MainAuth/MainAuth";

const RegisterPage: FC = () => {
  return (
    <MainAuth>
      <Banner />
      <AuthForm />
    </MainAuth>
  );
};

export default RegisterPage;
