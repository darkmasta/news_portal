import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "orders",
        name: "Orders",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/orders/Orders")
      },
      {
        path: "orders/create",
        name: "Orders Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/orders/Create")
      },
      {
        path: "orders/edit/:id",
        name: "Orders Edit",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/orders/Create")
      },
      {
        path: "orders/:id",
        name: "Order",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/orders/Order")
      },
    ]
  }
];
