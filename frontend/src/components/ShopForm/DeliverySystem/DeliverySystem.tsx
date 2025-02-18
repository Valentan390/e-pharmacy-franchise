import { FC } from "react";
import * as s from "./DeliverySystem.styled";

export interface DeliverySystemProps {
  onChange: (value: boolean) => void;
  value: boolean | undefined;
}

const DeliverySystem: FC<DeliverySystemProps> = ({ onChange, value }) => {
  const booleanValue = value ?? true;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value === "true");
  };

  return (
    <s.StyledFormControl>
      <s.StyledFormLabel htmlFor="delivery-system-yes">
        Has own Delivery System?
      </s.StyledFormLabel>

      <s.StyledRadioGroup
        name="delivery-system"
        value={booleanValue.toString()}
        onChange={handleChange}
      >
        <s.StyledFormControlLabel
          value="true"
          control={<s.StyledRadio id="delivery-system-yes" />}
          label="Yes"
        />
        <s.StyledFormControlLabel
          value="false"
          control={<s.StyledRadio id="delivery-system-no" />}
          label="No"
        />
      </s.StyledRadioGroup>
    </s.StyledFormControl>
  );
};

export default DeliverySystem;
