import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

  const routes = [
//進入不存在頁面會是空白的，因此新增設定
    {
      path: '*',
      redirect: 'Login',
  }, 
//   前台頁面
{
    path: '/shop',
    name: 'Shop',
    component: ()=>import('../views/font/Shop'),
  },
  {
    path: '/index',
    name: 'Index',
    component: ()=>import('../views/font/Index'),
  },
  {
    path: '/news',
    name: 'News',
    component: ()=>import('../views/font/News'),
  },
  {
    path: '/about',
    name: 'About',
    component: ()=>import('../views/font/About'),
  },
  // 測試業面完成後記得˙刪除
  {
    path: '/dinner',
    name: 'Dinner',
    component: ()=>import('../views/font/dinner'),
  },
//  後臺頁面
 
  {
      path: '/login',
      name: 'Login',
      component: ()=>import('../views/back/Login.vue'),
    },
  {
      path: '/admin',
      name: 'Dashboard',
      component: ()=>import('@/views/back/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
          {
              path: 'products',
              name: 'Products',
              component: ()=>import('@/views/back/Products.vue'),
              meta: { requiresAuth: true },

          },
          {
              path: 'coupons',
              name: 'Coupons',
              component: ()=>import('@/views/back/Coupons.vue'),
              meta: { requiresAuth: true },

          },
          {
              path: 'orders',
              name: 'Orders',
              component: ()=>import('@/views/back/Orders.vue'),
              meta: { requiresAuth: true },

          },
      ],
  },
  {
      name: 'Dashboard2',
      path: '/',
      component:  ()=>import('@/views/back/Dashboard.vue'),
      children: [
          {
              name: 'CustomerOrder',
              path: 'customerOrder',
              component:()=>import('@/views/back/CustomerOrder.vue'),
          },

      ],
  },
  {
      path: '/',
      name: 'Dashboard',
      component: ()=>import('@/views/back/Dashboard'),
      children: [
          {
              path: 'customer_order',
              name: 'CustomerOrder',
              component:()=>import('@/views/back/CustomerOrder'),          },
          {
              // 動態路由 76 章有講解
              path: 'customer_checkorder/:orderId',
              name: 'CustomerCheckOrder',
              component:()=>import('@/views/back/CustomerCheckOrder'),          },
      ],
  },
 
]

const router = new VueRouter({
  routes
})

export default router
