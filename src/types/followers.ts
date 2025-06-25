export type PayoutType = {
  state: string;
  name: string;
  transactionType: string;
};

export type FollowerType = {
  id: string;
  user_id: string;
  followable_id: string;
  followable_type: string;
  created_at: string;
  followable_details: {
    id: string;
    type: string;
    business_name: string;
    name: string;
  };
};

export type VendorFullFollowerType = {
  id: string;
  user_id: string;
  followable_id: string;
  followed_at: string;
  follower_details: {
    id: string;
    email: string;
    profile_picture: string | null;
    name: string;
  };
};
