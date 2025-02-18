import { nanoid } from "nanoid";
import { ShopItems } from "../types";

export const shopItems: ShopItems[] = [
  {
    id: nanoid(),
    label: "Shop Name",
    placeholder: "Enter text",
    name: "shopName",
  },
  {
    id: nanoid(),
    label: "Shop Owner Name",
    placeholder: "Enter text",
    name: "ownerName",
  },
  {
    id: nanoid(),
    label: "Email address",
    placeholder: "Enter text",
    name: "email",
  },
  {
    id: nanoid(),
    label: "Phone Number",
    placeholder: "Enter text",
    name: "phone",
  },
  {
    id: nanoid(),
    label: "Street address",
    placeholder: "Enter text",
    name: "street",
  },
  {
    id: nanoid(),
    label: "City",
    placeholder: "Enter text",
    name: "city",
  },
  {
    id: nanoid(),
    label: "Zip / Postal",
    placeholder: "Enter text",
    name: "zipPostal",
  },
];
