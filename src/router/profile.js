import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "profile",
        name: "Profile",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/auth/Profile")
      }
    ]
  }
];
