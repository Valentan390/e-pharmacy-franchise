import { FC } from "react";
import * as s from "./ShopInput.styled";
import { CreateShop, EditShop, NameShop } from "../../../types";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface ShopInputProps {
  label: string;
  placeholder: string;
  name: NameShop;
  register: UseFormRegister<CreateShop | EditShop>;
  error: FieldErrors;
  isValid: boolean;
}

const ShopInput: FC<ShopInputProps> = ({
  label,
  placeholder,
  name,
  register,
  error,
  isValid,
}) => {
  return (
    <s.Label>
      <s.LabelText>{label}</s.LabelText>
      <s.Input
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        {...register(name)}
        $errors={!!error[name]}
        $isValid={isValid}
      />
      {error[name] && <s.Error>{`${error[name]?.message}`}</s.Error>}
    </s.Label>
  );
};

export default ShopInput;
