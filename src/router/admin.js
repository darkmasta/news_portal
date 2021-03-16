import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "admin",
        name: "Admin",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/Dashboard"),
      },
      {
        path: "admin/salespersons",
        name: "SalesPersons",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/SalesPersons"),
      },
      {
        path: "admin/salespersons/:id",
        name: "SalesPerson",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/SalesPerson"),
      },
      {
        path: "admin/quotes",
        name: "AdminQuotes",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/Quotes"),
      },
      {
        path: "admin/quotes/:id",
        name: "AdminQuote",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/Quote"),
      },
      {
        path: "admin/orders",
        name: "AdminOrders",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/Orders"),
      },
      {
        path: "admin/orders/:id",
        name: "AdminOrder",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/Order"),
      },
      {
        path: "admin/users",
        name: "AdminUsers",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/Users"),
      },
      {
        path: "admin/users/:id",
        name: "AdminUser",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/admin/User"),
      },
    ],
  },
];
