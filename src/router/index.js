import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import TicketView from "../views/TicketView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import RegisterAdminView from "../views/RegisterAdminView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/ticket",
    name: "ticket",
    component: TicketView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/register-admin",
    name: "RegisterAdmin",
    component: RegisterAdminView,
    meta: { requiresAuth: true, requiresSuperAdmin: true }, // Protected route
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is authenticated
  const isSuperAdmin = localStorage.getItem("role") === "superAdmin"; // Check if user is super admin

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/login"); // Redirect to login if not authenticated
    } else if (
      to.matched.some((record) => record.meta.requiresSuperAdmin) &&
      !isSuperAdmin
    ) {
      next("/"); // Redirect to home if not super admin
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
