export type BannerType = {
  created_at: string;
  id: string;
  image_url: string;
  link_target: string;
  link_type: "external";
  order: number;
};

export type AdsCategoryType = {
  created_at: string;
  description: string;
  end_date: string;
  id: string;
  image_url: string | null;
  is_active: boolean;
  name: string;
  order: number;
  slug: string;
  start_date: string;
  updated_at: string;
};
