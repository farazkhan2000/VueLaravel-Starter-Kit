<template>
    <div class="flex min-h-screen p-3">
        <!-- Left Side: Forgot Password Form -->
        <div
            class="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-8"
        >
            <div class="w-full h-full flex flex-col justify-between">
                <!-- Logo -->
                <div>
                    <img
                        src="../../../assets/icons/google.png"
                        alt="Logo"
                        class="h-8"
                    />
                </div>

                <div class="w-full mx-auto max-w-md">
                    <h2 class="text-3xl font-semibold text-gray-900 mb-2">
                        Forgot your password?
                    </h2>
                    <p class="text-gray-500 text-sm mb-8">
                        Enter your email address and we’ll send you a link to
                        reset your password.
                    </p>

                    <form
                        @submit.prevent="handleForgotPassword"
                        class="space-y-5 mb-4"
                    >
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                v-model="email"
                                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
                        >
                            <span v-if="auth.isLoading">Sending...</span>
                            <span v-else>Send Reset Link</span>
                        </button>
                    </form>

                    <p class="text-center text-sm font-medium text-gray-500">
                        Remember your password?
                        <router-link
                            to="/login"
                            class="text-blue-500 hover:underline font-medium"
                        >
                            Login
                        </router-link>
                    </p>
                </div>

                <footer class="text-xs text-gray-400 text-center">
                    © 2025 InnoCode, All rights reserved
                </footer>
            </div>
        </div>

        <!-- Right Side: Image -->
        <div
            class="hidden md:flex w-1/2 items-center justify-center bg-blue-600 rounded-2xl"
        >
            <img
                src="../../../assets/images/login.png"
                alt="Illustration"
                class="max-w-[50rem] max-h-screen object-contain p-8"
            />
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";

export default {
    name: "ForgotPassword",
    data() {
        return {
            email: "",
            auth: useAuthStore(),
        };
    },
    methods: {
        async handleForgotPassword() {
            if (!this.email) return;
            await this.auth.forgotPassword(this.email);
        },
    },
};
</script>
