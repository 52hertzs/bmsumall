// 通过路由访问组件

import Vue from "vue";
// 只有引入vue-router 才能使用路由
import Router from "vue-router";

Vue.use(Router);
// 引入仓库
import store from "../store/index";

function checkEnter(path, next) {
  if (store.state.userInfo.menus_url.includes(path)) {
    next();
  } else next("/");
}

export let routes = [
  {
    path: "menu",
    component: () => import("../pages/menu/menu"),
    name: "菜单管理",
    beforeEnter: (to, from, next) => {
      checkEnter("/menu", next);
    }
  },
  {
    path: "role",
    component: () => import("../pages/role/role"),
    name: "角色管理",
    beforeEnter: (to, from, next) => {
      checkEnter("/role", next);
    }
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage"),
    name: "管理员管理",
    beforeEnter: (to, from, next) => {
      checkEnter("/manage", next);
    }
  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate"),
    name: "商品分类1",
    beforeEnter: (to, from, next) => {
      checkEnter("/cate", next);
    }
  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs"),
    name: "商品规格",
    beforeEnter: (to, from, next) => {
      checkEnter("/specs", next);
    }
  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods"),
    name: "商品管理",
    beforeEnter: (to, from, next) => {
      checkEnter("/goods", next);
    }
  },
  {
    path: "vip",
    component: () => import("../pages/vip/vip"),
    name: "会员管理",
    beforeEnter: (to, from, next) => {
      checkEnter("/vip", next);
    }
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner"),
    name: "轮播图管理",
    beforeEnter: (to, from, next) => {
      checkEnter("/banner", next);
    }
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill"),
    name: "秒杀活动",
    beforeEnter: (to, from, next) => {
      checkEnter("/seckill", next);
    }
  }
];

let router = new Router({
  routes: [
    //  一级路由：登录的路由
    { path: "/login", component: () => import("../pages/login/login") },
    // 一级路由：首页路由
    {
      path: "/",
      component: () => import("../pages/index/index"),
      //  二级路由
      children: [
        {
          // 当我点击二级路由侧边栏选项才会出现二级路由，二级路由的出口是在是在一级路由的里面的，二级路由是一级路由的组件，二级路由是可以变得，一级留有默认显示index,
          path: "",
          component: () => import("../pages/home/home")
        },
        // 8.拼接
        ...routes
      ]
    }
  ]
});

// 登陆拦截

router.beforeEach((to, from, next) => {
  // 前往的是登录拿就登陆
  if (to.path == "/login") {
    next();
    return;
  }
  //本地存储的方式，前往的不是登录，查看是否登录
  // if(sessionStorage.getItem('userInfo')){
  //   next()
  //   return;
  // }
// 如果登录了就会有userinfo.token的字段
  if (store.state.userInfo.token) {
    next();
    return;
  }

  next("/login");
});

export default router;
