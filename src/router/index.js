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
    path: '/',
    name: 'Font',
    component: () => import('@/views/font/Font.vue'),
    children: [
      // 修改成前台頁面
      {
        path: 'index',
        name: 'Index',
        component: () => import('../views/font/Index'),
      }, {
        path: 'products',
        name: 'Proudcts',
        component: () => import('../views/font/Products'),
      }, {
        path: 'products_detail/:id',
        name: 'ProductsDetail',
        component: () => import('../views/font/ProductsDetail'),
      }, {
        path: 'about',
        name: 'About',
        component: () => import('../views/font/About'),
      }, {
        path: 'news',
        name: 'News',
        component: () => import('../views/font/News'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/font/Cart'),
      },
      {
        path: 'cart_addres',
        name: 'CartAddres',
        component: () => import('../views/font/CartAddres'),
      },
      {
        path: 'cart_over/:orderId',
        name: 'CartOver',
        component: () => import('../views/font/CartOver'),
      },
      {
        path: 'cart_pay',
        name: 'CartPay',
        component: () => import('../views/font/CartPay'),
      },

    ]
  },

  //  後臺頁面
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/back/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@/views/back/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'back_products',
        name: 'BackProducts',
        component: () => import('@/views/back/BackProducts.vue'),
        meta: { requiresAuth: true },

      },
      {
        path: 'back_coupons',
        name: 'BackCoupons',
        component: () => import('@/views/back/BackCoupons.vue'),
        meta: { requiresAuth: true },

      },
      {
        path: 'back_orders',
        name: 'BackOrders',
        component: () => import('@/views/back/BackOrders.vue'),
        meta: { requiresAuth: true },

      },
    ],
  },
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/back/Dashboard'),
    children: [
      {
        path: 'back_customer_order',
        name: 'BackCustomerOrder',
        component: () => import('@/views/back/BackCustomerOrder'),
      },
      {
        // 動態路由 76 章有講解
        path: 'back_customer_checkorder/:orderId',
        name: 'BackCustomerCheckOrder',
        component: () => import('@/views/back/BackCustomerCheckOrder'),
      },
    ],
  },

]

const router = new VueRouter({
  routes
})

export default router
