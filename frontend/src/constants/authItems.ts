import { nanoid } from "nanoid";
import { ItemsAuth } from "../types";

export const itemsSignup: ItemsAuth[] = [
  { id: nanoid(), name: "username", placeholder: "User Name" },
  { id: nanoid(), name: "email", placeholder: "Email address" },
  { id: nanoid(), name: "phone", placeholder: "Phone number" },
  { id: nanoid(), name: "password", placeholder: "Password" },
  { id: nanoid(), name: "repitPassword", placeholder: "Repit Password" },
];

export const itemsSignin: ItemsAuth[] = [
  { id: nanoid(), name: "email", placeholder: "Email address" },
  { id: nanoid(), name: "password", placeholder: "Password" },
  { id: nanoid(), name: "repitPassword", placeholder: "Repit Password" },
];
