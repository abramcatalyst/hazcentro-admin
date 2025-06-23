export type VendorType = {
  id: string;
  user_id: string;
  business_name: string;
  business_registration_number: string | null;
  nature_of_business: string;
  sector_industry: string;
  website_url: string | null;
  business_phone_number: string | null;
  role_position: string | null;
  means_of_identification: string;
  id_number: string;
  type_of_products: string;
  description_of_products: string;
  region_territory_covered: string;
  warehouse_location: string;
  is_registered: number;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    unique_user_id: string;
    name: string;
    email: string;
    gender: string;
    state: string;
    country: string;
    country_code: string;
    phone_number: string;
    status: string;
    push_notification_status: string;
    longitude: string;
    latitude: string;
    address: string | null;
    kyc_status: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    role: string;
    roles: {
      id: string;
      name: string;
      guard_name: string;
      created_at: string;
      updated_at: string;
      pivot: {
        model_type: string;
        model_id: string;
        role_id: string;
      };
    }[];
  };
};

export type PartOrderType = {
  id: string;
  tracking_id: string;
  status: string;
  total_price: string;
  items: {
    product_id: string;
    product_name: string;
    price: string;
    image: string;
  }[];
  created_at: string;
};
export type VendorFollowerType = {
  user_id: string;
  unique_user_id: string;
  name: string;
  email: string;
  gender: string;
  profile_picture: string | null;
  followed_at: string;
};
export type VendorOverviewType = {
  profile: {
    user_id: string;
    unique_user_id: string;
    name: string;
    business_name: string;
    business_reg_no: string;
    nature_of_business: string;
    sector_industry: string;
    biz_phone_number: string | null;
    website: string | null;
    location: string | null;
    region: string | null;
    product_type: string | null;
    role_position: string | null;
    means_of_id: string | null;
    verified_badge: string | null;
    profile_picture_url: string | null;
    last_seen_at: string | null;
  };
  summary: {
    total_products: number;
    successful_sales: number;
    years_selling: number;
    sales_today: number;
    units_today: number;
    category_count: number;
    balance_on_hold: number;
    active_order_count: number;
    follower_count: number;
    review_stats: {
      average_rating: number;
      total_reviews: number;
    };
  };
  active_orders: PartOrderType[];
  latest_orders: PartOrderType[];
  recent_followers: VendorFollowerType[];
  documents: [];
};
