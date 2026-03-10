export type SubscriptionType = {
  id: string;
  plan: { id: string; name: string; price: string; type: string };
  expires_at: string;
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
