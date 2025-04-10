import { RoleType } from "./agents";
import { MediaType } from "./media";

export type OrderItemImageType = {
  id: number;
  url: string;
  name: string;
};
export type OrderItemCategoryType = {
  id: string;
  name: string;
  total_products: number;
  pivot: {
    product_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
  };
};
export type OrderItemType = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_sale: string;
  total_price: string;
  created_at: string;
  updated_at: string;
  product: {
    id: string;
    vendor_id: string;
    name: string;
    sku: string;
    description: string;
    brand_id: string;
    price: string;
    discounted_price: string;
    warranty: string | null;
    overview: string;
    is_active: number;
    is_featured: number;
    other_category_id: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    images: OrderItemImageType[];
    discount_percentage: number;
    media: MediaType[];
    vendor: {
      id: string;
      business_name: string;
    };
    categories: OrderItemCategoryType[];
  };
};

export type OrderType = {
  id: string;
  user_id: string;
  agent_id: string;
  total_price: string;
  payment_status: string;
  payment_reference: string;
  status: string;
  tracking_id: string;
  created_at: string;
  updated_at: string;
  buyer: {
    id: string;
    name: string;
    email: string;
    type: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    roles: RoleType[];
  };
  order_items: OrderItemType[];
  order_delivery: {
    id: string;
    order_id: string;
    delivery_method_id: string;
    address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    longitude: string;
    latitude: string;
    phone_number: string;
    status: string;
    created_at: string;
    updated_at: string;
    delivery_method: {
      id: string;
      name: string;
    };
  };
  agent: {
    id: string;
    name: string;
    role: string;
    roles: RoleType[];
  };
};
