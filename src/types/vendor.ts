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
    sku: string;
    image: string;
  }[];
  created_at: string;
};
// {
//     "status": true,
//     "data": {
//         "profile": {
//             "user_id": "ef6a9df4-4c7e-44c3-b511-b173ce4de679",
//             "unique_user_id": "D8OUFZE",
//             "name": "Runtown Mart",
//             "business_name": "Mertz, Von and Gerlach",
//             "business_reg_no": null,
//             "nature_of_business": "quia",
//             "sector_industry": "qui",
//             "biz_phone_number": null,
//             "website": null,
//             "location": null,
//             "region": null,
//             "product_type": null,
//             "role_position": null,
//             "means_of_id": null,
//             "verified_badge": null,
//             "profile_picture_url": "https:\/\/haz.reevaluateme.online\/storage\/206\/d-sm.jpg",
//             "last_seen_at": "1 day ago"
//         },
//         "summary": {
//             "total_products": 33,
//             "successful_sales": 0,
//             "years_selling": -0.256775601046201173982552745655993930995464324951171875,
//             "sales_today": 0,
//             "units_today": 0,
//             "category_count": 17,
//             "balance_on_hold": 1089.220000000000027284841053187847137451171875,
//             "active_order_count": 10,
//             "follower_count": 1,
//             "review_stats": {
//                 "average_rating": 0,
//                 "total_reviews": 0
//             }
//         },
//         "active_orders": [
//             {
//                 "id": "2547b723-ed5a-4c4a-8e7e-a1384f00f52a",
//                 "tracking_id": "ORD-20250509-FZJ8",
//                 "status": "processing",
//                 "total_price": "1006.58",
//                 "items": [
//                     {
//                         "product_id": "3250e0e7-ca32-4c67-a077-3215cbdcbc91",
//                         "product_name": "distinctio",
//                         "sku": null,
//                         "price": "503.29",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/138\/product2.png"
//                     }
//                 ],
//                 "created_at": "2025-05-09 11:37:35"
//             },
//             {
//                 "id": "29096e6c-1dd6-498b-98fe-521a74825458",
//                 "tracking_id": "ORD-20250507-V86H",
//                 "status": "processing",
//                 "total_price": "10.61",
//                 "items": [
//                     {
//                         "product_id": "17904b99-46d0-4d07-8664-a91337628dea",
//                         "product_name": "Roofing Sheet",
//                         "sku": null,
//                         "price": "10.61",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/99\/product2.png"
//                     }
//                 ],
//                 "created_at": "2025-05-07 20:21:52"
//             },
//             {
//                 "id": "3597b1db-7aec-4ce0-bc92-73a193afe091",
//                 "tracking_id": "GUEST-0Y1L-EW5M",
//                 "status": "pending",
//                 "total_price": "144.96",
//                 "items": [
//                     {
//                         "product_id": "175d279e-6d87-4d3d-a441-c4c6440cee35",
//                         "product_name": "cupiditate",
//                         "sku": null,
//                         "price": "41.32",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/142\/product3.png"
//                     }
//                 ],
//                 "created_at": "2025-04-11 09:07:12"
//             },
//             {
//                 "id": "4326ff94-97ac-4d27-9eba-693a57886103",
//                 "tracking_id": "GUEST-P68D-GDCR",
//                 "status": "pending",
//                 "total_price": "23633.31",
//                 "items": [
//                     {
//                         "product_id": "0b71d891-b4bb-4a54-a1f6-55f309f39c61",
//                         "product_name": "iste",
//                         "sku": null,
//                         "price": "536.88",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/95\/product6.png"
//                     },
//                     {
//                         "product_id": "0f40d762-c40e-4887-a611-0c9a7e602aef",
//                         "product_name": "veniam",
//                         "sku": null,
//                         "price": "852.65",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/145\/product4.png"
//                     }
//                 ],
//                 "created_at": "2025-05-04 15:02:58"
//             },
//             {
//                 "id": "4673471e-c8e6-4349-b481-ff82a09ccbd2",
//                 "tracking_id": "GUEST-IAGC-1EN6",
//                 "status": "pending",
//                 "total_price": "23633.31",
//                 "items": [
//                     {
//                         "product_id": "0b71d891-b4bb-4a54-a1f6-55f309f39c61",
//                         "product_name": "iste",
//                         "sku": null,
//                         "price": "536.88",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/95\/product6.png"
//                     },
//                     {
//                         "product_id": "0f40d762-c40e-4887-a611-0c9a7e602aef",
//                         "product_name": "veniam",
//                         "sku": null,
//                         "price": "852.65",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/145\/product4.png"
//                     }
//                 ],
//                 "created_at": "2025-05-04 21:16:13"
//             },
//             {
//                 "id": "4dad0957-4060-47df-86f2-c0a7638995fa",
//                 "tracking_id": "ORD-20250509-ODW7",
//                 "status": "processing",
//                 "total_price": "82.64",
//                 "items": [
//                     {
//                         "product_id": "175d279e-6d87-4d3d-a441-c4c6440cee35",
//                         "product_name": "cupiditate",
//                         "sku": null,
//                         "price": "41.32",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/142\/product3.png"
//                     }
//                 ],
//                 "created_at": "2025-05-09 11:36:21"
//             },
//             {
//                 "id": "6840919e-99a3-4334-ad60-5235f9fb51e6",
//                 "tracking_id": "GUEST-70UV-1CGG",
//                 "status": "pending",
//                 "total_price": "23633.31",
//                 "items": [
//                     {
//                         "product_id": "0b71d891-b4bb-4a54-a1f6-55f309f39c61",
//                         "product_name": "iste",
//                         "sku": null,
//                         "price": "536.88",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/95\/product6.png"
//                     },
//                     {
//                         "product_id": "0f40d762-c40e-4887-a611-0c9a7e602aef",
//                         "product_name": "veniam",
//                         "sku": null,
//                         "price": "852.65",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/145\/product4.png"
//                     }
//                 ],
//                 "created_at": "2025-05-04 15:02:42"
//             },
//             {
//                 "id": "76eed38c-973d-46fc-9554-535914288e7c",
//                 "tracking_id": "GUEST-HDW0-VOIQ",
//                 "status": "processing",
//                 "total_price": "1926.41",
//                 "items": [
//                     {
//                         "product_id": "0f40d762-c40e-4887-a611-0c9a7e602aef",
//                         "product_name": "veniam",
//                         "sku": null,
//                         "price": "852.65",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/145\/product4.png"
//                     },
//                     {
//                         "product_id": "0b71d891-b4bb-4a54-a1f6-55f309f39c61",
//                         "product_name": "iste",
//                         "sku": null,
//                         "price": "536.88",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/95\/product6.png"
//                     }
//                 ],
//                 "created_at": "2025-04-09 01:03:36"
//             },
//             {
//                 "id": "9440f404-5266-427f-b361-63f0ba421bb0",
//                 "tracking_id": "GUEST-S40I-WBHP",
//                 "status": "pending",
//                 "total_price": "144.96",
//                 "items": [
//                     {
//                         "product_id": "175d279e-6d87-4d3d-a441-c4c6440cee35",
//                         "product_name": "cupiditate",
//                         "sku": null,
//                         "price": "41.32",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/142\/product3.png"
//                     }
//                 ],
//                 "created_at": "2025-04-09 01:06:51"
//             },
//             {
//                 "id": "9db7a5a7-3321-4c67-b601-5410f63d22ed",
//                 "tracking_id": "ORD-20250507-LPDZ",
//                 "status": "processing",
//                 "total_price": "21.22",
//                 "items": [
//                     {
//                         "product_id": "17904b99-46d0-4d07-8664-a91337628dea",
//                         "product_name": "Roofing Sheet",
//                         "sku": null,
//                         "price": "10.61",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/99\/product2.png"
//                     }
//                 ],
//                 "created_at": "2025-05-07 16:32:19"
//             }
//         ],
//         "latest_orders": [
//             {
//                 "id": "2547b723-ed5a-4c4a-8e7e-a1384f00f52a",
//                 "tracking_id": "ORD-20250509-FZJ8",
//                 "status": "processing",
//                 "total_price": "1006.58",
//                 "items": [
//                     {
//                         "product_id": "3250e0e7-ca32-4c67-a077-3215cbdcbc91",
//                         "product_name": "distinctio",
//                         "price": "503.29",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/138\/product2.png"
//                     }
//                 ],
//                 "created_at": "2025-05-09 11:37:35"
//             },
//             {
//                 "id": "4dad0957-4060-47df-86f2-c0a7638995fa",
//                 "tracking_id": "ORD-20250509-ODW7",
//                 "status": "processing",
//                 "total_price": "82.64",
//                 "items": [
//                     {
//                         "product_id": "175d279e-6d87-4d3d-a441-c4c6440cee35",
//                         "product_name": "cupiditate",
//                         "price": "41.32",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/142\/product3.png"
//                     }
//                 ],
//                 "created_at": "2025-05-09 11:36:21"
//             },
//             {
//                 "id": "29096e6c-1dd6-498b-98fe-521a74825458",
//                 "tracking_id": "ORD-20250507-V86H",
//                 "status": "processing",
//                 "total_price": "10.61",
//                 "items": [
//                     {
//                         "product_id": "17904b99-46d0-4d07-8664-a91337628dea",
//                         "product_name": "Roofing Sheet",
//                         "price": "10.61",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/99\/product2.png"
//                     }
//                 ],
//                 "created_at": "2025-05-07 20:21:52"
//             },
//             {
//                 "id": "9db7a5a7-3321-4c67-b601-5410f63d22ed",
//                 "tracking_id": "ORD-20250507-LPDZ",
//                 "status": "processing",
//                 "total_price": "21.22",
//                 "items": [
//                     {
//                         "product_id": "17904b99-46d0-4d07-8664-a91337628dea",
//                         "product_name": "Roofing Sheet",
//                         "price": "10.61",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/99\/product2.png"
//                     }
//                 ],
//                 "created_at": "2025-05-07 16:32:19"
//             },
//             {
//                 "id": "df28ace3-2b59-4bcd-95df-32a01f4ee883",
//                 "tracking_id": "ORD-20250507-OZDA",
//                 "status": "completed",
//                 "total_price": "21.22",
//                 "items": [
//                     {
//                         "product_id": "17904b99-46d0-4d07-8664-a91337628dea",
//                         "product_name": "Roofing Sheet",
//                         "price": "10.61",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/99\/product2.png"
//                     }
//                 ],
//                 "created_at": "2025-05-07 16:28:03"
//             },
//             {
//                 "id": "4673471e-c8e6-4349-b481-ff82a09ccbd2",
//                 "tracking_id": "GUEST-IAGC-1EN6",
//                 "status": "pending",
//                 "total_price": "23633.31",
//                 "items": [
//                     {
//                         "product_id": "0b71d891-b4bb-4a54-a1f6-55f309f39c61",
//                         "product_name": "iste",
//                         "price": "536.88",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/95\/product6.png"
//                     },
//                     {
//                         "product_id": "0f40d762-c40e-4887-a611-0c9a7e602aef",
//                         "product_name": "veniam",
//                         "price": "852.65",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/145\/product4.png"
//                     }
//                 ],
//                 "created_at": "2025-05-04 21:16:13"
//             },
//             {
//                 "id": "4326ff94-97ac-4d27-9eba-693a57886103",
//                 "tracking_id": "GUEST-P68D-GDCR",
//                 "status": "pending",
//                 "total_price": "23633.31",
//                 "items": [
//                     {
//                         "product_id": "0b71d891-b4bb-4a54-a1f6-55f309f39c61",
//                         "product_name": "iste",
//                         "price": "536.88",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/95\/product6.png"
//                     },
//                     {
//                         "product_id": "0f40d762-c40e-4887-a611-0c9a7e602aef",
//                         "product_name": "veniam",
//                         "price": "852.65",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/145\/product4.png"
//                     }
//                 ],
//                 "created_at": "2025-05-04 15:02:58"
//             },
//             {
//                 "id": "6840919e-99a3-4334-ad60-5235f9fb51e6",
//                 "tracking_id": "GUEST-70UV-1CGG",
//                 "status": "pending",
//                 "total_price": "23633.31",
//                 "items": [
//                     {
//                         "product_id": "0b71d891-b4bb-4a54-a1f6-55f309f39c61",
//                         "product_name": "iste",
//                         "price": "536.88",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/95\/product6.png"
//                     },
//                     {
//                         "product_id": "0f40d762-c40e-4887-a611-0c9a7e602aef",
//                         "product_name": "veniam",
//                         "price": "852.65",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/145\/product4.png"
//                     }
//                 ],
//                 "created_at": "2025-05-04 15:02:42"
//             },
//             {
//                 "id": "3597b1db-7aec-4ce0-bc92-73a193afe091",
//                 "tracking_id": "GUEST-0Y1L-EW5M",
//                 "status": "pending",
//                 "total_price": "144.96",
//                 "items": [
//                     {
//                         "product_id": "175d279e-6d87-4d3d-a441-c4c6440cee35",
//                         "product_name": "cupiditate",
//                         "price": "41.32",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/142\/product3.png"
//                     }
//                 ],
//                 "created_at": "2025-04-11 09:07:12"
//             },
//             {
//                 "id": "9440f404-5266-427f-b361-63f0ba421bb0",
//                 "tracking_id": "GUEST-S40I-WBHP",
//                 "status": "pending",
//                 "total_price": "144.96",
//                 "items": [
//                     {
//                         "product_id": "175d279e-6d87-4d3d-a441-c4c6440cee35",
//                         "product_name": "cupiditate",
//                         "price": "41.32",
//                         "image": "https:\/\/haz.reevaluateme.online\/storage\/142\/product3.png"
//                     }
//                 ],
//                 "created_at": "2025-04-09 01:06:51"
//             }
//         ],
//         "recent_followers": [
//             {
//                 "user_id": "4cc3f4f6-b4f5-4020-a6e1-f1c9d395eb75",
//                 "unique_user_id": "A6RQEVV",
//                 "name": "Test User",
//                 "email": "test.customer@example.com",
//                 "gender": "female",
//                 "profile_picture": null,
//                 "followed_at": "2025-06-23 13:24:37"
//             }
//         ],
//         "documents": []
//     }
// }
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
