import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { SigninFormData, SignupFormData } from "../../types";
import { useLocation } from "react-router-dom";
import { schemaSignIn, schemaSignUp } from "../../helpers";
import { itemsSignin, itemsSignup } from "../../constants";
import AuthInput from "./AuthInput/AuthInput";
import { ButtonAuth, FormAuth, LinkAuth } from "./AuthForm.styled";

const AuthForm: FC = () => {
  const { pathname } = useLocation();
  const isSignup = pathname === "/register";
  const schema = isSignup ? schemaSignUp : schemaSignIn;

  type FormData = SignupFormData | SigninFormData;

  const authItems = isSignup ? itemsSignup : itemsSignin;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = handleSubmit(({ repitPassword, ...dataAuth }) => {
    // delete data.repitPassword;
    console.log(dataAuth);
    console.log(repitPassword);
  });

  return (
    <FormAuth onSubmit={onSubmit}>
      {authItems.map(({ id, name, placeholder }) => (
        <AuthInput
          key={id}
          name={name}
          placeholder={placeholder}
          register={register}
          errors={errors}
          isValid={isValid}
        />
      ))}

      <ButtonAuth disabled={!isValid} $isSignup={isSignup}>
        {isSignup ? "Register" : "Log in"}
      </ButtonAuth>
      <LinkAuth to={isSignup ? "/login" : "/register"}>
        {isSignup ? "Already have an account?" : "Don't have an account?"}
      </LinkAuth>
    </FormAuth>
  );
};

export default AuthForm;
