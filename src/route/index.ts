import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'), // Changed to Home.vue
    meta: { title: "Sean's Home Page" },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { title: 'Dashboard' },
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Page Not Found' },
  },
  {
    path: '/:catchAll(.*)',
    name: 'CatchAll',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Page Not Found' },
  },
  // Add more routes here as needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 简单的批量路由配置
const protectedRoutes = ['Dashboard'] // 需要登录的路由
const adminRoutes: string[] = [] // 需要管理员权限的路由

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查是否需要登录
  if (protectedRoutes.includes(to.name as string)) {
    // 在这里写你的登录检查逻辑
    console.log('需要检查登录状态')
  }

  // 检查是否需要管理员权限
  if (adminRoutes.includes(to.name as string)) {
    // 在这里写你的权限检查逻辑
    console.log('需要检查管理员权限')
  }

  // 放行
  next()
})

export const navigateTo = (name: string) => {
  router.push({ name })
}

export default router
