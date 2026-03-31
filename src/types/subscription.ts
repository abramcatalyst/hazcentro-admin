export type SubscriptionType = {
  id: string;
  expires_at: string;
  user_id: string;
  subscription_id: string;
  payment_status: string;
  created_at: string;
  updated_at: string;
  payment_reference: string | null;
  app_subscription_id: string;
  source: string;
  subscription: {
    id: string;
    name: string;
    description: string;
    type: string;
    user_type: string;
    status: string;
    price: string;
    created_at: string;
    updated_at: string;
  };
};

export type SubscriptionResType = {
  active_subscription: null;
  history: {
    current_page: 1;
    data: SubscriptionType[];
    first_page_url: string;
    from: null;
    last_page: 1;
    last_page_url: string;
    links: [
      {
        url: null;
        label: "&laquo; Previous";
        active: false;
      },
      {
        url: string;
        label: "1";
        active: true;
      },
      {
        url: null;
        label: "Next &raquo;";
        active: false;
      },
    ];
    next_page_url: null;
    path: string;
    per_page: 10;
    prev_page_url: null;
    to: null;
    total: 0;
  };
};
