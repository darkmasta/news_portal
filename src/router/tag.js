import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "tags",
        name: "Tags",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/tag/Tags"),
      },
      {
        path: "tags/create",
        name: "Tags Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/tag/Create"),
      },
      {
        path: "tags/:id",
        name: "Tag",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/tag/TagEdit"),
      },
    ],
  },
];
