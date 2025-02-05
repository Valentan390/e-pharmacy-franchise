import { FC, useState } from "react";
import { AuthInputProps, Name } from "../../../types";
import { ButtonEye, IconEye, Input, Label, Message } from "./AuthInput.styled";
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
    <Label>
      <Input
        $errors={!!errors[name]}
        $isValid={isValid}
        type={getTypeInput(name, passwordVisible)}
        {...register(name)}
        placeholder={placeholder}
        autoComplete={name === "password" ? "current-password" : "off"}
      />

      {(errors[name] || isValid) && (
        <Message $error={!!errors[name]}>
          {errors[name] ? `${errors[name]?.message}` : `Success ${name}`}
        </Message>
      )}

      {(name === "password" || name === "repitPassword") && (
        <ButtonEye
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
        >
          <IconEye
            $errors={!!errors[name]}
            $isValid={isValid}
            iconName={getIconName(errors, isValid, passwordVisible)}
            width={20}
            height={20}
          />
        </ButtonEye>
      )}
    </Label>
  );
};

export default AuthInput;
