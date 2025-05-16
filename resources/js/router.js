import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const routes = [
    {
        path: "/",
        component: () => import("./Pages/Home.vue"),
        meta: { requiresAuth: false },
    },
    {
        path: "/test",
        component: () => import("./Pages/TestRoute.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        component: () => import("./Pages/auth/Login.vue"),
        meta: { requiresGuest: true },
    },
    {
        path: "/register",
        component: () => import("./Pages/auth/Register.vue"),
        meta: { requiresGuest: true },
    },
    {
        path: "/forgot-password",
        component: () => import("./Pages/auth/ForgotPassword.vue"),
        meta: { requiresGuest: true },
    },
    {
        path: "/reset-password",
        component: () => import("./Pages/auth/ResetPassword.vue"),
        meta: { requiresGuest: true },
    },
    {
        path: "/dashboard",
        component: () => import("@/Pages/Dashboard.vue"),
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // For routes that don't require auth
    if (!to.meta.requiresAuth && !to.meta.requiresGuest) {
        next();
        return;
    }

    // Check authentication state
    const isAuthenticated = await authStore.checkAuth();

    // Redirect unauthenticated users trying to access protected routes
    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: "/login", query: { redirect: to.fullPath } });
        return;
    }

    // Redirect authenticated users away from guest-only routes
    if (to.meta.requiresGuest && isAuthenticated) {
        next({ path: "/dashboard" });
        return;
    }

    // Role-based access control
    if (to.meta.requiredRole) {
        if (authStore.user?.role !== to.meta.requiredRole) {
            next({ path: "/unauthorized" });
            return;
        }
    }

    next();
});

export default router;
