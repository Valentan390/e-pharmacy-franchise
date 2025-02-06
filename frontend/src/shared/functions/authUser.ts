import { FieldErrors } from "react-hook-form";
import { FormData, Name } from "../../types";

export const getTypeInput = (name: Name, passwordVisible: boolean) => {
  if (name === "password" || name === "repitPassword") {
    return passwordVisible ? "text" : "password";
  } else {
    return name === "email" ? "email" : "text";
  }
};

export const getIconName = (
  errors: FieldErrors<FormData>,
  isValid: boolean,
  passwordVisible: boolean
) => {
  if (errors.password || errors.repitPassword) {
    return "icon-pajamas_error";
  } else if (isValid) {
    return "icon-gg_check-o";
  }
  return passwordVisible ? "icon-eye" : "icon-eye-off";
};
