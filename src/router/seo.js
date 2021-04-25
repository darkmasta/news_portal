import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "seo",
        name: "SEO",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/seo/SeoList"),
      },
      {
        path: "seo/create",
        name: "SEO Create",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/seo/Create"),
      },
    ],
  },
];
