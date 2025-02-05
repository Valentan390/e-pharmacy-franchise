import { FC, useState } from "react";
import { AuthInputProps, Name } from "../../../types";
import * as s from "./AuthInput.styled";
import { FieldErrors } from "react-hook-form";

const AuthInput: FC<AuthInputProps> = ({
  name,
  placeholder,
  register,
  errors,
  isValid,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const getTypeInput = (name: Name, passwordVisible: boolean) => {
    if (name === "password" || name === "repitPassword") {
      return passwordVisible ? "text" : "password";
    } else {
      return name === "email" ? "email" : "text";
    }
  };

  const getIconName = (
    errors: FieldErrors,
    isValid: boolean,
    passwordVisible: boolean
  ) => {
    if (errors[name]) {
      return "icon-pajamas_error";
    } else if (isValid) {
      return "icon-gg_check-o";
    }
    return passwordVisible ? "icon-eye" : "icon-eye-off";
  };

  return (
    <s.Label>
      <s.Input
        $errors={!!errors[name]}
        $isValid={isValid}
        type={getTypeInput(name, passwordVisible)}
        {...register(name)}
        placeholder={placeholder}
        autoComplete={name === "password" ? "current-password" : "off"}
      />

      {(errors[name] || isValid) && (
        <s.Message $error={!!errors[name]}>
          {errors[name] ? `${errors[name]?.message}` : `Success ${name}`}
        </s.Message>
      )}

      {(name === "password" || name === "repitPassword") && (
        <s.ButtonEye
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          <s.IconEye
            $errors={!!errors[name]}
            $isValid={isValid}
            iconName={getIconName(errors, isValid, passwordVisible)}
            width={20}
            height={20}
          />
        </s.ButtonEye>
      )}
    </s.Label>
  );
};

export default AuthInput;
