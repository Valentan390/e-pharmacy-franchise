import { FC } from "react";
import * as s from "./ShopLogo.styled";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateShop, EditShop } from "../../../types";
import { NameShop } from "../../../types";
import { Error } from "../ShopInput/ShopInput.styled";

export interface ShopLogoProps {
  register: UseFormRegister<CreateShop | EditShop>;
  error: FieldErrors;
  isValid: boolean;
  name: NameShop;
}

const ShopLogo: FC<ShopLogoProps> = ({
  register,
  error,
  isValid,
  name = "logo",
}) => {
  return (
    <s.LogoContainer>
      <s.LogoText>Upload Logo</s.LogoText>
      <s.LabelLogo $errors={!!error[name]} $isValid={isValid}>
        <s.LogoIcon iconName="icon-attachment-3" width={18} height={18} />
        Change image
        <s.InputFileHidden
          type="file"
          accept="image/*, .png, .jpg, .gif, .webp"
          {...register(name)}
        />
        {error[name] && <Error>{`${error[name]?.message}`}</Error>}
      </s.LabelLogo>
    </s.LogoContainer>
  );
};

export default ShopLogo;
