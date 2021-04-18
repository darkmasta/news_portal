import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "contact",
        name: "Contact",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/contact/Contact"),
      },
    ],
  },
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "about",
        name: "About",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/contact/About"),
      },
    ],
  },
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "identity",
        name: "Identity",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/contact/Identity"),
      },
    ],
  },
];
