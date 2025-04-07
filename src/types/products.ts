import { MediaType } from "./media";
import { VendorType } from "./vendor";

export type ProductType = {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: string;
  discounted_price: null | string;
  is_active: number;
  is_featured: number;
  discount_percentage: null | string;
  warranty: string;
  overview: null | string;
  media: { url: string }[];
  categories: {
    id: string;
    name: string;
  }[];
  vendor: {
    id: string;
    name: string;
  };
  inventory: {
    id: string;
    quantity: number;
  };
  reviews: [];
};
export type ProductFromCategoryType = {
  id: string;
  vendor_id: string;
  name: string;
  sku: string;
  description: string;
  brand_id: string;
  price: string;
  discounted_price: null | string;
  warranty: null | string;
  overview: null | string;
  is_active: number;
  is_featured: number;
  other_category_id: null | string;
  created_at: string;
  updated_at: string;
  discount_percentage: null | string;
  pivot: {
    category_id: string;
    product_id: string;
    created_at: string;
    updated_at: string;
  };
  vendor: VendorType;
  media: MediaType[];
};
