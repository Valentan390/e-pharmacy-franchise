import { FC } from "react";
import { useLocation } from "react-router-dom";
import { shopItems } from "../../constants/shopItems";
import * as s from "./ShopForm.styled";
import DeliverySystem from "./DeliverySystem/DeliverySystem";
import { createShopSchema, editShopSchema } from "../../helpers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateShop, EditShop } from "../../types";
import ShopInput from "./ShopInput/ShopInput";
import ShopLogo from "./ShopLogo/ShopLogo";

const ShopForm: FC = () => {
  const { pathname } = useLocation();
  const isCreatePage = pathname === "/shop/create-shop";
  const validationSchema = isCreatePage ? createShopSchema : editShopSchema;
  type FormType = typeof isCreatePage extends true ? CreateShop : EditShop;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      ownDeliverySystem: false,
    },
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <s.Container>
      <s.Title>{isCreatePage ? "Create your Shop" : "Edit data"}</s.Title>
      <s.Subtitle>
        This information will be displayed publicly so be careful what you
        share.
      </s.Subtitle>
      <s.Form onSubmit={onSubmit}>
        <s.Wrapper>
          {shopItems.map(({ id, label, placeholder, name }) => (
            <ShopInput
              key={id}
              label={label}
              placeholder={placeholder}
              name={name}
              register={register}
              error={errors}
              isValid={isValid}
            />
          ))}

          <ShopLogo
            register={register}
            error={errors}
            isValid={isValid}
            name="logo"
          />
        </s.Wrapper>

        <Controller
          name="ownDeliverySystem"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <DeliverySystem onChange={onChange} value={value} />
          )}
        />

        <s.ButtonShop>{isCreatePage ? "Create account" : "Save"}</s.ButtonShop>
      </s.Form>
    </s.Container>
  );
};

export default ShopForm;
