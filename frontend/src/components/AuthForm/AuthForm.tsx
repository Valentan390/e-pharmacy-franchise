import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormData, SigninRequestBody, SignupRequestBody } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { schemaSignIn, schemaSignUp } from "../../helpers";
import { itemsSignin, itemsSignup } from "../../constants";
import AuthInput from "./AuthInput/AuthInput";
import * as s from "./AuthForm.styled";
import { useAppDispatch } from "../../hooks";
import {
  signinThunk,
  signupThunk,
} from "../../redux/authUser/authUserOperations";
import { toast } from "react-toastify/unstyled";

const AuthForm: FC = () => {
  const { pathname } = useLocation();
  const isSignup = pathname === "/register";
  const schema = isSignup ? schemaSignUp : schemaSignIn;
  const authItems = isSignup ? itemsSignup : itemsSignin;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: "onChange" });

  const onSubmit = handleSubmit(async ({ repitPassword, ...dataAuth }) => {
    try {
      if (isSignup) {
        const signupData = dataAuth as SignupRequestBody;
        await dispatch(signupThunk(signupData)).unwrap();
        reset();
        navigate("/login");
      } else {
        const signinData = dataAuth as SigninRequestBody;
        await dispatch(signinThunk(signinData)).unwrap();
        reset();
        navigate("/shop/create-shop");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`${error.message}`);
      }
    }

    console.log(repitPassword);
  });

  return (
    <>
      <s.FormAuth onSubmit={onSubmit} $isSignup={isSignup}>
        <s.InputContainer>
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
        </s.InputContainer>
        <s.ButtonContainer>
          <s.ButtonAuth disabled={!isValid}>
            {isSignup ? "Register" : "Log in"}
          </s.ButtonAuth>
          <s.LinkAuth to={isSignup ? "/login" : "/register"}>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </s.LinkAuth>
        </s.ButtonContainer>
      </s.FormAuth>
    </>
  );
};

export default AuthForm;
