import * as yup from "yup";

const emailRegexp = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;

const phoneRegexp = /^(\+?\d{1,3})?\d{3}-\d{3}-\d{2}-\d{2}$/;

export const schemaSignUp = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be no more than 20 characters long"),
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegexp, "Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(18, "Password must be no more than 18 characters long"),
  repitPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Repeat password is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      phoneRegexp,
      "Enter phone in format: 097-333-88-87 or +380-97-333-88-87"
    ),
});

export const schemaSignIn = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .matches(emailRegexp, "Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(18, "Password must be no more than 18 characters long"),
  repitPassword: yup
    .string()
    .required("Repeat password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
