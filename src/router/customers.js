import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "customers",
        name: "Customers",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/customers/Customers")
      },
      {
        path: "customers/create",
        name: "Customers Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/customers/Create")
      },
      {
        path: "customers/edit/:id",
        name: "Customers Edit",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/customers/Create")
      }
    ]
  }
];
