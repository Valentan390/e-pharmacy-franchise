export interface CreateShop {
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zipPostal: string;
  ownDeliverySystem: boolean;
  logo?: File;
}

export interface EditShop {
  shopName?: string;
  ownerName?: string;
  email?: string;
  phone?: string;
  street?: string;
  city?: string;
  zipPostal?: string;
  ownDeliverySystem?: boolean;
  logo?: File;
}

export type NameShop =
  | "shopName"
  | "ownerName"
  | "email"
  | "phone"
  | "street"
  | "city"
  | "zipPostal"
  | "ownDeliverySystem"
  | "logo";

export interface ShopItems {
  id: string;
  label: string;
  placeholder: string;
  name: NameShop;
}
