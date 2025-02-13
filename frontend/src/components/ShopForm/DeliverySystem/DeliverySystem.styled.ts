import { styled } from "@mui/material/styles";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { theme } from "../../../styles";

export const StyledFormControl = styled(FormControl)(() => ({
  gap: "6px",
  margin: "8px 0 0",

  "@media screen and (min-width: 768px)": {},

  "@media screen and (min-width: 1440px)": {},
}));

export const StyledFormLabel = styled(FormLabel)(() => ({
  color: theme.colors.black,
  fontFamily: "inherit",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: 1.28,
  "&.Mui-focused": {
    color: theme.colors.black,
  },

  "@media screen and (min-width: 768px)": {},

  "@media screen and (min-width: 1440px)": {},
}));

export const StyledRadioGroup = styled(RadioGroup)(() => ({
  flexDirection: "row",

  "@media screen and (min-width: 768px)": {},

  "@media screen and (min-width: 1440px)": {},
}));

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  "& .MuiTypography-root": {
    color: "rgba(29, 30, 33, 0.6)",
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  "& .Mui-checked + .MuiTypography-root": {
    color: theme.colors.black,
  },

  "@media screen and (min-width: 768px)": {},

  "@media screen and (min-width: 1440px)": {},
}));

export const StyledRadio = styled(Radio)(() => ({
  "& .MuiSvgIcon-root": {
    fontSize: 20,
  },
  color: theme.colors.blackTransparent,
  "&.Mui-checked": {
    color: theme.colors.green,
  },

  "@media screen and (min-width: 768px)": {},

  "@media screen and (min-width: 1440px)": {},
}));
