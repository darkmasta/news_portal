import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "activities",
        name: "Activities",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/activities/Activities"),
      },
      {
        path: "activities/create",
        name: "Activity Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/activities/Create"),
      },
      {
        path: "activities/:id",
        name: "Activity",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/activities/Activity"),
      },
    ],
  },
];
