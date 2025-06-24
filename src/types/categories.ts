import { MediaType } from "./media";
import { ProductFromCategoryType } from "./products";

export type SubCategoryType = {
  id: string;
  name: string;
  description: string;
  parent_id: string;
  user_id: string;
  icon: string | null;
  is_featured: boolean;
  sort_order: string | null;
  depth: number;
  status: string;
  created_at: string;
  updated_at: string;
  total_products: number;
  media: MediaType[];
};
export type CategoryType = {
  id: string;
  name: string;
  description: string;
  parent_id: string | null;
  user_id: string;
  icon: string | null;
  is_featured: boolean;
  sort_order: string | null;
  depth: number;
  status: string;
  created_at: string;
  updated_at: string;
  total_products: number;
  subcategories: SubCategoryType[];
  media: MediaType[];
};

export type SingleCategoryType = {
  id: string;
  name: string;
  description: string;
  parent_id: string | null;
  user_id: string;
  is_featured: boolean;
  sort_order: string | null;
  depth: number;
  status: string;
  created_at: string;
  updated_at: string;
  total_products: 9;
  media: MediaType[];
  subcategories: SubCategoryType[];
  products: {
    data: ProductFromCategoryType[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    lings: {
      url: null | string;
      label: string;
      active: boolean;
    }[];
    next_page: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
  };
};

export type VendorProductCategoryType = {
  id: string;
  name: string;
  total_products: number;
  change_percent: string;
  category_icon: string;
};
