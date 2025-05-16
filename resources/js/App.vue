<template>
    <router-view v-slot="{ Component, route }">
        <component :is="getLayout(Component)">
            <component :is="Component" />
        </component>
    </router-view>
</template>

<script setup>
import DefaultLayout from "./layouts/DefaultLayout.vue";
import DashboardLayout from "./layouts/DashboardLayout.vue";
import { onMounted, onUnmounted } from "vue";
import { useAuthStore } from "./stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

// Define all available layouts here
const layoutMap = {
    DefaultLayout,
    DashboardLayout,
};

// Function to resolve layout from component definition
const getLayout = (Component) => {
    const layoutName = Component?.type?.layout || "DefaultLayout";
    return layoutMap[layoutName] || DefaultLayout;
};

// Inactivity Logout Setup
let inactivityTimer;

const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        authStore.logout(); // or authStore.resetAuth()
        router.push("/login");
    }, 30 * 60 * 1000); // 30 minutes
};

const events = ["click", "mousemove", "keydown"];

onMounted(() => {
    events.forEach((event) =>
        window.addEventListener(event, resetInactivityTimer)
    );
    resetInactivityTimer();
});

onUnmounted(() => {
    events.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
    );
    clearTimeout(inactivityTimer);
});
</script>
