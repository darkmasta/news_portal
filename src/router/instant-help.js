import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "instant-help",
        name: "Instant Help",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/instant-help/Instant-Help")
      },
      {
        path: "instant-help/create",
        name: "Instant Help Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/instant-help/Create")
      },
      {
        path: "instant-help/:id",
        name: "Ticket",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/instant-help/Ticket")
      }
    ]
  }
];
