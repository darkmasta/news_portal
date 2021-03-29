import LayoutBlank from "@/layout/LayoutBlank";

export default [
  {
    path: "/",
    component: LayoutBlank,
    children: [
      {
        path: "home",
        name: "HomePage",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/home/HomePage"),
      },
      {
        path: "posts/:id",
        name: "Post",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/posts/Post"),
      },
    ],
  },
];
