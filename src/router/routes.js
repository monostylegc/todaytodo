
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/auth', component: () => import('pages/Auth.vue') },
      { path: '/', component: () => import('pages/Today.vue') },
      { path: '/log', component: () => import('pages/Log.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
