import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import NotFound from '@/components/NotFound'

import globals from '@/globals'

import pagesRoutes from './pages'
import profileRoutes from './profile'
import categoryRoutes from './category'
import postsRoutes from './posts'
import activitiesRoutes from './activity'
import adminRoutes from './admin'
import dashboardRoutes from './dashboard'
import homeRoutes from './home'
import contactRoutes from './contact'
import adsRoutes from './advertisement'
import tagRoutes from './tag'
import seoRoutes from './seo'
import languageRoutes from './language'

Vue.use(Router)
Vue.use(Meta)

const ROUTES = []
  .concat(dashboardRoutes)
  .concat(pagesRoutes)
  .concat(profileRoutes)
  .concat(categoryRoutes)
  .concat(postsRoutes)
  .concat(activitiesRoutes)
  .concat(adminRoutes)
  .concat(homeRoutes)
  .concat(adsRoutes)
  .concat(tagRoutes)
  .concat(seoRoutes)
  .concat(languageRoutes)
  .concat(contactRoutes)

ROUTES.push({
  path: '*',
  component: NotFound
})

const router = new Router({
  base: '/',
  routes: ROUTES
})

router.afterEach(() => {
  // On small screens collapse sidenav
  if (
    window.layoutHelpers &&
    window.layoutHelpers.isSmallScreen() &&
    !window.layoutHelpers.isCollapsed()
  ) {
    setTimeout(() => window.layoutHelpers.setCollapsed(true, true), 10)
  }

  // Scroll to top of the page
  globals().scrollTop(0, 0)
})

router.beforeEach((to, from, next) => {
  // Set loading state
  document.body.classList.add('app-loading')

  // Add tiny timeout to finish page transition
  setTimeout(() => next(), 10)
})

router.beforeEach((to, from, next) => {
  ''
  // Set loading state
  document.body.classList.add('app-loading')

  const loggedIn = localStorage.getItem('user')

  if (to.matched.some(record => record.meta.auth) && !loggedIn) {
    next('/auth/login')
    return
  }
  next()
})

export default router
