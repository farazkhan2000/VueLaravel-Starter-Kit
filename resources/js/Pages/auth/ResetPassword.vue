<template>
    <div class="flex min-h-screen p-3">
        <!-- Left Side: Reset Password Form -->
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
                        Reset your password
                    </h2>
                    <p class="text-gray-500 text-sm mb-8">
                        Enter your new password below to reset your account.
                    </p>

                    <!-- Success Message -->
                    <div
                        v-if="auth.resetStatus"
                        class="mb-6 p-4 bg-green-50 text-green-700 rounded-lg"
                    >
                        <p class="font-medium">Password reset successful!</p>
                        <p class="text-sm mt-1">
                            You can now login with your new password.
                        </p>
                    </div>

                    <form
                        @submit.prevent="handleResetPassword"
                        class="space-y-5 mb-4"
                        v-if="!auth.resetStatus"
                    >
                        <input type="hidden" v-model="token" />

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
                                :disabled="true"
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                New Password
                            </label>
                            <input
                                type="password"
                                v-model="password"
                                :class="[
                                    'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none',
                                    auth.errors?.password
                                        ? 'border-red-300'
                                        : 'border-gray-200',
                                ]"
                                required
                                :disabled="auth.isLoading"
                            />
                            <p
                                v-if="auth.errors?.password"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ auth.errors.password[0] }}
                            </p>
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                v-model="passwordConfirmation"
                                :class="[
                                    'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none',
                                    auth.errors?.password_confirmation
                                        ? 'border-red-300'
                                        : 'border-gray-200',
                                ]"
                                required
                                :disabled="auth.isLoading"
                            />
                            <p
                                v-if="auth.errors?.password_confirmation"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ auth.errors.password_confirmation[0] }}
                            </p>
                        </div>

                        <button
                            type="submit"
                            :disabled="auth.isLoading"
                            :class="[
                                'w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium py-2.5 rounded-lg transition',
                                auth.isLoading
                                    ? 'opacity-70 cursor-not-allowed'
                                    : 'hover:from-blue-700 hover:to-blue-600 cursor-pointer',
                            ]"
                        >
                            <span v-if="auth.isLoading">
                                <svg
                                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Resetting...
                            </span>
                            <span v-else>Reset Password</span>
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
    name: "ResetPassword",
    data() {
        return {
            token: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            auth: useAuthStore(),
        };
    },
    created() {
        // Get token and email from URL query parameters
        this.token = this.$route.query.token || "";
        this.email =
            this.$route.query.email || this.auth.getStoredResetEmail() || "";

        if (!this.token || !this.email) {
            this.$router.push("/forgot-password");
        }
    },
    methods: {
        async handleResetPassword() {
            if (!this.password || !this.passwordConfirmation) return;

            const resetData = {
                token: this.token,
                email: this.email,
                password: this.password,
                password_confirmation: this.passwordConfirmation,
            };

            const { success } = await this.auth.resetPassword(resetData);

            if (success) {
                // Redirect handled by auth store
            }
        },
    },
    beforeUnmount() {
        // Reset auth errors when component is unmounted
        this.auth.errors = null;
    },
};
</script>

<style scoped>
/* Add any custom styles here if needed */
</style>
