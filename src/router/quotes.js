import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "quotes",
        name: "Quotes",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/quotes/Quotes")
      },
      {
        path: "quotes/create",
        name: "Quotes Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/quotes/Create")
      },
      {
        path: "quotes/:id",
        name: "Quote",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/quotes/Quote")
      }
    ]
  }
];
