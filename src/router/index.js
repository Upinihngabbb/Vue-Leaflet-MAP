import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/maps",
    component: () => import("../views/maps.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
