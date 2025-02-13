import { FC, useState } from "react";
import * as s from "./DeliverySystem.styled";

const DeliverySystem: FC = () => {
  const [value, setValue] = useState("true");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <s.StyledFormControl>
      <s.StyledFormLabel id="radio-buttons-group">
        Has own Delivery System?
      </s.StyledFormLabel>
      <s.StyledRadioGroup
        aria-labelledby="radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <s.StyledFormControlLabel
          value={"true"}
          control={<s.StyledRadio />}
          label="Yes"
        />
        <s.StyledFormControlLabel
          value={"false"}
          control={<s.StyledRadio />}
          label="No"
        />
      </s.StyledRadioGroup>
    </s.StyledFormControl>
  );
};

export default DeliverySystem;
