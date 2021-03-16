import Layout1 from "@/layout/Layout1";

export default [
  {
    path: "/",
    component: Layout1,
    children: [
      {
        path: "",
        name: "Dashboard",
        meta: {
          auth: false,
        },
        component: () => import("@/pages/dashboard/Dashboard")
      }
    ]
  }
];
