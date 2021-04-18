import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "ads",
        name: "Ads",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/ads/Advertisements"),
      },
      {
        path: "ads/create",
        name: "Ads Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/ads/Create"),
      },
      {
        path: "ads/:id",
        name: "Ad",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/ads/AdvertisementEdit"),
      },
    ],
  },
];
