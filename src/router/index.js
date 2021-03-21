import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";
import NotFound from "@/components/NotFound";

import globals from "@/globals";

import pagesRoutes from "./pages";
import profileRoutes from "./profile";
import quotesRoutes from "./quotes";
import categoryRoutes from "./category";
import ordersRoutes from "./orders";
import instantHelpsRoutes from "./instant-help";
import postsRoutes from "./posts";
import invoicingRoutes from "./invoicing";
import adminRoutes from "./admin";
import dashboardRoutes from "./dashboard";

Vue.use(Router);
Vue.use(Meta);

const ROUTES = []
  .concat(dashboardRoutes)
  .concat(pagesRoutes)
  .concat(profileRoutes)
  .concat(quotesRoutes)
  .concat(categoryRoutes)
  .concat(ordersRoutes)
  .concat(instantHelpsRoutes)
  .concat(postsRoutes)
  .concat(invoicingRoutes)
  .concat(adminRoutes);

ROUTES.push({
  path: "*",
  component: NotFound,
});

const router = new Router({
  base: "/",
  routes: ROUTES,
});

router.afterEach(() => {
  // On small screens collapse sidenav
  if (
    window.layoutHelpers &&
    window.layoutHelpers.isSmallScreen() &&
    !window.layoutHelpers.isCollapsed()
  ) {
    setTimeout(() => window.layoutHelpers.setCollapsed(true, true), 10);
  }

  // Scroll to top of the page
  globals().scrollTop(0, 0);
});

router.beforeEach((to, from, next) => {
  // Set loading state
  document.body.classList.add("app-loading");

  // Add tiny timeout to finish page transition
  setTimeout(() => next(), 10);
});

router.beforeEach((to, from, next) => {
  "";
  // Set loading state
  document.body.classList.add("app-loading");

  const loggedIn = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.auth) && !loggedIn) {
    next("/auth/login");
    return;
  }
  next();
});

export default router;
