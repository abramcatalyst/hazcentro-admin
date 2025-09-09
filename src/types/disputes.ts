import { RoleType } from "./agents";
import { CategoryType } from "./categories";
import { MediaType } from "./media";

export type DisputeType = {
  id: string;
  order_id: string;
  order_item_id: string;
  user_id: string;
  type: string;
  status: string;
  message: string;
  resolved_at: string;
  created_at: string;
  updated_at: string;
  order: {
    id: string;
    tracking_id: string;
    status: string;
    handoff_status: string;
    order_vendor_handoff: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone_number: string;
    profile_picture_url: null;
    media: [];
    roles: RoleType[];
  };
  order_item: {
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
      warranty: string;
      overview: string;
      is_active: boolean;
      is_featured: boolean;
      other_category_id: string;
      created_at: string;
      updated_at: string;
      deleted_at: string;
      discount_percentage: string;
      total_likes: number;
      vendor: {
        id: string;
        user_id: string;
        name: string;
        business_name: string;
        business_registration_number: string;
        nature_of_business: string;
        sector_industry: string;
        website_url: string;
        business_phone_number: string;
        role_position: string;
        means_of_identification: string;
        id_number: string;
        type_of_products: string;
        description_of_products: string;
        region_territory_covered: string;
        warehouse_location: string;
        is_registered: boolean;
        created_at: string;
        updated_at: string;
      };
      categories: CategoryType[];
    };
  };
  media: MediaType[];
};

export type SingleDisputeType = {
  id: string;
  order_id: string;
  order_item_id: string;
  user: {
    id: string;
    unique_id: string;
    name: string;
    email: string;
  };
  type: string;
  status: string;
  message: string;
  product: {
    id: string;
    name: string;
    vendor_id: string;
    vendor: {
      id: string;
      name: string;
    };
  };
  attachments: string[];
  created_at: string;
  updated_at: string;

  replies: [];
};
