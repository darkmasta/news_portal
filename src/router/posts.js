import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "posts",
        name: "Posts",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/posts/Posts"),
      },
      {
        path: "posts/create",
        name: "Posts Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/posts/Create"),
      },
    ],
  },
];
