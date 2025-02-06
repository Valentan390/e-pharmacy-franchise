import { FC, useState } from "react";
import { AuthInputProps } from "../../../types";
import * as s from "./AuthInput.styled";
import { getIconName, getTypeInput } from "../../../shared/functions";

const AuthInput: FC<AuthInputProps> = ({
  name,
  placeholder,
  register,
  errors,
  isValid,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

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
          ariaLabel="icon"
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
