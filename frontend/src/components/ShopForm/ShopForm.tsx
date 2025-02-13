import { FC } from "react";
import { useLocation } from "react-router-dom";
import { shopItems } from "../../constants/shopItems";
import * as s from "./ShopForm.styled";
import DeliverySystem from "./DeliverySystem/DeliverySystem";

const ShopForm: FC = () => {
  const { pathname } = useLocation();
  const isCreatePage = pathname === "/shop/create-shop";

  return (
    <s.Container>
      <s.Title>{isCreatePage ? "Create your Shop" : "Edit data"}</s.Title>
      <s.Subtitle>
        This information will be displayed publicly so be careful what you
        share.
      </s.Subtitle>
      <s.Form>
        <s.Wrapper>
          {shopItems.map(({ id, label, placeholder }) => (
            <s.Label key={id}>
              <s.LabelText>{label}</s.LabelText>
              <s.Input type="text" placeholder={placeholder} />
            </s.Label>
          ))}

          <s.LogoContainer>
            <s.LogoText>Upload Logo</s.LogoText>
            <s.LabelLogo>
              <s.LogoIcon iconName="icon-attachment-3" width={18} height={18} />
              Change image
              <s.InputFileHidden
                type="file"
                accept="image/*, .png, .jpg, .gif, .webp"
              />
            </s.LabelLogo>
          </s.LogoContainer>
        </s.Wrapper>

        <DeliverySystem />

        <s.ButtonShop>{isCreatePage ? "Create account" : "Save"}</s.ButtonShop>
      </s.Form>
    </s.Container>
  );
};

export default ShopForm;
