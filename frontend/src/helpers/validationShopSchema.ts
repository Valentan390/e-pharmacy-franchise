import * as yup from "yup";

const phoneRegexp = /^\d{3}-\d{3}-\d{2}-\d{2}$/;

export const createShopSchema = yup.object({
  shopName: yup
    .string()
    .min(2, "Shop name must be at least 2 characters long")
    .max(50, "Shop name cannot exceed 50 characters")
    .required("Shop name is required"),

  ownerName: yup
    .string()
    .min(2, "Owner name must be at least 2 characters long")
    .max(50, "Owner name cannot exceed 50 characters")
    .required("Owner name is required"),

  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  phone: yup
    .string()
    .matches(phoneRegexp, "Phone number must be in format XXX-XXX-XX-XX")
    .required("Phone number is required"),

  street: yup
    .string()
    .min(2, "Street name must be at least 2 characters long")
    .max(100, "Street name cannot exceed 100 characters")
    .required("Street name is required"),

  city: yup
    .string()
    .min(2, "City name must be at least 2 characters long")
    .max(50, "City name cannot exceed 50 characters")
    .required("City name is required"),

  zipPostal: yup.string().required("ZIP/Postal code is required"),

  ownDeliverySystem: yup
    .string()
    .transform((value) =>
      value === "true" ? true : value === "false" ? false : value
    )
    .oneOf(["true", "false"], "Invalid value for ownDeliverySystem")
    .required("Please specify if you have your own delivery system"),

  logo: yup
    .mixed<FileList>()
    .required("Logo is required")
    .test("fileType", "Only PNG, JPG, and WebP images are allowed", (value) => {
      return (
        value &&
        value.length > 0 &&
        ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
          value[0].type
        )
      );
    })
    .test("fileSize", "File size must not exceed 2MB", (value) => {
      return value && value.length > 0 && value[0].size <= 2 * 1024 * 1024;
    }),
});
