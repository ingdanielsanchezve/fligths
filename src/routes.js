import { createWebHistory, createRouter } from "vue-router";

import Admin from "@/layouts/Admin.vue";
import Dashboard from "@/views/Dashboard.vue";

// routes
const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: Admin,
    children: [
      {
        path: "/dashboard",
        component: Dashboard,
      }
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});