import { nanoid } from "nanoid";

export const navItems = [
  { id: nanoid(), to: "/shop/create-shop", text: "Shop" },
  { id: nanoid(), to: "/medicine", text: "Medicine" },
  { id: nanoid(), to: "/statistics", text: "Statistics" },
];
