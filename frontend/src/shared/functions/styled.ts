import { DefaultTheme } from "styled-components";

export const getColor = (
  theme: DefaultTheme,
  $errors: boolean,
  $isValid: boolean
) => {
  if ($errors) {
    return theme.colors.red;
  } else {
    return $isValid ? theme.colors.green : theme.colors.blackTransparent10;
  }
};
