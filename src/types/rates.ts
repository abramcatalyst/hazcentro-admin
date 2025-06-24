export type RateType = {
  id: string;
  user: {
    name: string;
  };
  review: string;
  rating: number;
  created_at: string;
  product: {
    id: string;
    name: string;
    price: string;
    image_url: string;
  };
};
