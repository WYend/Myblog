import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    meta: { guestOnly: true }, // 仅游客可访问
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: { guestOnly: true }, // 仅游客可访问
  },
  {
    path: "/articles",
    name: "ArticleList",
    component: () => import("@/views/ArticleList.vue"),
  },
  {
    path: "/category/:category",
    name: "Category",
    component: () => import("@/views/ArticleList.vue"),
  },
  {
    path: "/tag/:tag",
    name: "Tag",
    component: () => import("@/views/ArticleList.vue"),
  },
  {
    path: "/article/:id",
    name: "ArticleDetail",
    component: () => import("@/views/ArticleDetail.vue"),
    props: true, // 将路由参数作为props传递
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
