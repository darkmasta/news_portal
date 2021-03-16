import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "category",
        name: "Category",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/category/Category"),
      },
      {
        path: "category/create",
        name: "Category Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/category/Create"),
      },
      {
        path: "category/edit/:id",
        name: "Category Edit",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/category/Create"),
      },
    ],
  },
];
