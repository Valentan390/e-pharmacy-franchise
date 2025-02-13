import { FC } from "react";
import ShopForm from "../../components/ShopForm/ShopForm";
import * as s from "./CreateShopPage.styled";
import ImageMedicines from "../../components/ImageMedicines/ImageMedicines";

const CreateShopPage: FC = () => {
  return (
    <s.Main>
      <s.Section>
        <s.Container className="container">
          <ShopForm />
          <ImageMedicines />
        </s.Container>
      </s.Section>
    </s.Main>
  );
};

export default CreateShopPage;
