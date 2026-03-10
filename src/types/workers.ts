export type WorkerRecentActivityType = {
  id: string;
  user_name: string;
  skill_requested: string;
  description: string;
  status: string;
  created_at: string;
};
export type WorkerPortfolioType = {
  id: string;
  description: string;
  images: string[];
};
export type WorkerOverviewType = {
  id: string;
  user_id: string;
  skill_type: string;
  skill_category: string;
  custom_skill: string | null;
  skill_description: string | null;
  town_city: string | null;
  state: string | null;
  years_of_experience: number | null;
  whatsapp_number: string | null;
  online_status: string;
  avg_rating: number | null;
  total_reviews_count: number;
  user_details: {};
  portfolios: WorkerPortfolioType[];
  recent_activities: WorkerRecentActivityType[];
  job_requests_summary: {
    total: number;
    pending: number;
    accepted: number;
    declined: number;
    user_completed: number;
    finished: number;
  };
  subscription: null | {
    id: string;
    plan: { id: string; name: string; price: string; type: string };
    expires_at: string;
  };
};

export type JobRequestType = {
  id: string;
  user: {
    id: string;
    unique_user_id: string | null;
    name: string;
    email: string | null;
    longitude: number | null;
    latitude: number | null;
    last_seen_at: string | null;
    profile_picture_url: string | null;
  };
  worker_id: string;
  skill_category: string | null;
  custom_skill: string;
  description: string;
  address: string | null;
  latitude: string;
  longitude: string;
  status: string;
  created_at: string;
  updated_at: string;
};

export type WorkerDocumentType = {
  id: string;
  user_id: string;
  document_type: string; // CAC
  document_id_number: string | null;
  is_kyc: boolean;
  status: "approved" | "declined";
  verified_by: string;
  media_id: number;
  media_url: string;
  created_at: string;
  updated_at: string;
};
