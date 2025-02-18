import * as yup from "yup";

const REGEXP = {
  phone: /^\d{3}-\d{3}-\d{2}-\d{2}$/,
  zipCode: /^\d{5}(-\d{4})?$/,
} as const;

const ERROR_MESSAGES = {
  required: (field: string) => `${field} is required`,
  min: (field: string, min: number) =>
    `${field} must be at least ${min} characters long`,
  max: (field: string, max: number) =>
    `${field} cannot exceed ${max} characters`,
  email: "Please enter a valid email address",
  phone: "Phone number must be in format XXX-XXX-XX-XX",
  zipCode: "Please enter a valid ZIP/Postal code",
} as const;

const baseShopSchema = {
  shopName: yup
    .string()
    .min(2, ERROR_MESSAGES.min("Shop name", 2))
    .max(50, ERROR_MESSAGES.max("Shop name", 50)),

  ownerName: yup
    .string()
    .min(2, ERROR_MESSAGES.min("Owner name", 2))
    .max(50, ERROR_MESSAGES.max("Owner name", 50)),

  email: yup.string().email(ERROR_MESSAGES.email),

  phone: yup.string().matches(REGEXP.phone, ERROR_MESSAGES.phone),

  street: yup
    .string()
    .min(2, ERROR_MESSAGES.min("Street name", 2))
    .max(100, ERROR_MESSAGES.max("Street name", 100)),

  city: yup
    .string()
    .min(2, ERROR_MESSAGES.min("City name", 2))
    .max(50, ERROR_MESSAGES.max("City name", 50)),

  zipPostal: yup.string().matches(REGEXP.zipCode, ERROR_MESSAGES.zipCode),

  ownDeliverySystem: yup.boolean(),

  logo: yup
    .mixed<File>()
    .test("fileSize", "File is too large", (file) => {
      if (!(file instanceof File)) return true;
      return file.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Unsupported file format", (file) => {
      if (!(file instanceof File)) return true;
      return [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/webp",
      ].includes(file.type);
    }),
};

export const createShopSchema = yup.object({
  ...baseShopSchema,
  shopName: baseShopSchema.shopName.required(
    ERROR_MESSAGES.required("Shop name")
  ),
  ownerName: baseShopSchema.ownerName.required(
    ERROR_MESSAGES.required("Owner name")
  ),
  email: baseShopSchema.email.required(ERROR_MESSAGES.required("Email")),
  phone: baseShopSchema.phone.required(ERROR_MESSAGES.required("Phone number")),
  street: baseShopSchema.street.required(
    ERROR_MESSAGES.required("Street name")
  ),
  city: baseShopSchema.city.required(ERROR_MESSAGES.required("City name")),
  zipPostal: baseShopSchema.zipPostal.required(
    ERROR_MESSAGES.required("ZIP/Postal code")
  ),
  ownDeliverySystem: baseShopSchema.ownDeliverySystem.required(
    ERROR_MESSAGES.required("Delivery system specification")
  ),
});

export const editShopSchema = yup.object(baseShopSchema);
