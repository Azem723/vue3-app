import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
    // 动态路由，只有访问的时候才会加载
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () =>
      import(/* webpackChunkName: "CartList" */ '../views/cartList/CartList')
    // 动态路由，只有访问的时候才会加载
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () =>
      import(/* webpackChunkName: "OrderList" */ '../views/orderList/OrderList')
    // 动态路由，只有访问的时候才会加载
  },
  {
    path: '/person',
    name: 'Person',
    component: () =>
      import(/* webpackChunkName: "Person" */ '../views/person/Person')
    // 动态路由，只有访问的时候才会加载
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () =>
      import(
        /* webpackChunkName: "OrderConfirmation" */ '../views/orderConfirmation/OrderConfirmation'
      )
    // 动态路由，只有访问的时候才会加载
  },
  {
    path: '/shop/:id', // 定义传递的id
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/login/Login'),
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () =>
      import(/* webpackChunkName: "Register" */ '../views/register/Register'),
    beforeEnter: (to, from, next) => {
      const { isLogin } = localStorage;
      isLogin ? next({ name: 'Home' }) : next();
    }
  },
  {
    path: '/addressList',
    name: 'AddressList',
    component: () =>
      import(
        /* webpackChunkName: "AddressList" */ '../views/address/AddressList'
      )
  },
  {
    path: '/addressList/Address/:id?',
    name: 'Address',
    component: () =>
      import(/* webpackChunkName: "Address" */ '../views/address/NewAddress')
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  const isLogin = localStorage.isLogin;
  const { name } = to;
  const isLoginOrRegister = name === 'Login' || name === 'Register';
  isLogin || isLoginOrRegister ? next() : next({ name: 'Login' });
  // else {
  //   next({ name: 'Login' })
  // }
});

export default router;
