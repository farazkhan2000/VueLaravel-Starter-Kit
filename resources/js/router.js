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

    // If route requires authentication
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ path: "/login", query: { redirect: to.fullPath } });
        return;
    }

    // If route requires guest (login/register)
    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        next({ path: "/dashboard" });
        return;
    }

    // If route requires specific role
    if (to.meta.requiredRole) {
        // Ensure user data is loaded
        if (!authStore.user) {
            try {
                await authStore.fetchUser();
            } catch (error) {
                authStore.resetAuth();
                next({ path: "/login" });
                return;
            }
        }

        // Check role
        if (authStore.user.role !== to.meta.requiredRole) {
            next({ path: "/unauthorized" });
            return;
        }
    }

    next();
});

export default router;
