import Vue from 'vue'
import VueRouter from 'vue-router'





Vue.use(VueRouter)


  const routes = [
//進入不存在頁面會是空白的，因此新增設定
    {
      path: '*',
      redirect: 'Login',
  },
  {
      path: '/login',
      name: 'Login',
      component: ()=>import('../views/login.vue'),
    },
  {
      path: '/admin',
      name: 'Dashboard',
      component: ()=>import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
          {
              path: 'products',
              name: 'Products',
              component: ()=>import('@/views/Products.vue'),
              meta: { requiresAuth: true },

          },
          {
              path: 'coupons',
              name: 'Coupons',
              component: ()=>import('@/views/Coupons.vue'),
              meta: { requiresAuth: true },

          },
          {
              path: 'orders',
              name: 'Orders',
              component: ()=>import('@/views/Orders.vue'),
              meta: { requiresAuth: true },

          },
      ],
  },
  {
      name: 'Dashboard2',
      path: '/',
      component:  ()=>import('@/views/Dashboard.vue'),
      children: [
          {
              name: 'CustomerOrder',
              path: 'customerOrder',
              component:()=>import('@/views/CustomerOrder.vue'),
          },

      ],
  },
  {
      path: '/',
      name: 'Dashboard',
      component: ()=>import('@/views/Dashboard'),
      children: [
          {
              path: 'customer_order',
              name: 'CustomerOrder',
              component:()=>import('@/views/CustomerOrder'),          },
          {
              // 動態路由 76 章有講解
              path: 'customer_checkorder/:orderId',
              name: 'CustomerCheckOrder',
              component:()=>import('@/views/CustomerCheckOrder'),          },
      ],
  }
]

const router = new VueRouter({
  routes
})

export default router
