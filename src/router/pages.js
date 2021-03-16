import LayoutBlank from "@/layout/LayoutBlank";

export default [
  {
    path: "/auth",
    component: LayoutBlank,
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/pages/auth/AuthenticationLogin"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/pages/auth/AuthenticationRegister"),
      },
    ],
  },
];
