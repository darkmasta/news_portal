import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "invoicing",
        name: "Invoicing",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/invoicing/Invoicing")
      },
      {
        path: "invoicing/create",
        name: "Invoicing Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/invoicing/Create")
      },
      {
        path: "invoicing/edit/:id",
        name: "Invoicing Edit",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/invoicing/Create")
      }
    ]
  }
];
