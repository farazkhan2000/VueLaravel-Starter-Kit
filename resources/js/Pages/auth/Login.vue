<template>
    <div class="flex min-h-screen p-3">
        <!-- Left Side: Login Form -->
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
                        Get Started Now
                    </h2>
                    <p class="text-gray-500 text-sm mb-8">
                        Enter your credentials to access your account
                    </p>

                    <!-- Social Login -->
                    <div class="flex space-x-4 mb-4">
                        <button
                            class="flex items-center justify-center w-full px-4 py-2 font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            <img
                                src="../../../assets/icons/google.png"
                                alt="Google"
                                class="h-5 w-5 mr-2"
                            />
                            Log in with Google
                        </button>
                        <button
                            class="flex items-center justify-center w-full px-4 py-2 font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            <img
                                src="../../../assets/icons/apple.png"
                                alt="Apple"
                                class="h-5 w-5 mr-2"
                            />
                            Log in with Apple
                        </button>
                    </div>

                    <!-- Divider -->
                    <div class="flex items-center space-x-2 text-sm my-8">
                        <hr class="flex-1 text-gray-200" />
                        <span class="text-gray-400">or</span>
                        <div class="flex-1 border-t text-gray-200"></div>
                    </div>

                    <!-- Login Form -->
                    <form @submit.prevent="handleLogin" class="space-y-5 mb-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Email address</label
                            >
                            <input
                                type="email"
                                v-model="form.email"
                                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <div class="flex justify-between items-center mb-1">
                                <label
                                    class="block text-sm font-medium text-gray-700"
                                    >Password</label
                                >
                                <a
                                    href="/forgot-password"
                                    class="text-sm font-medium text-blue-500 hover:underline"
                                    >Forgot password?</a
                                >
                            </div>
                            <div class="relative w-full">
                                <input
                                    :type="showPassword ? 'text' : 'password'"
                                    v-model="form.password"
                                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                                    placeholder=""
                                    required
                                />
                                <button
                                    type="button"
                                    class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 cursor-pointer"
                                    @click="togglePassword"
                                    tabindex="-1"
                                >
                                    <Eye v-if="!showPassword" class="w-5 h-5" />
                                    <EyeOff v-else class="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
                        >
                            <span v-if="auth.isLoading">Logging in...</span>
                            <span v-else>Login</span>
                        </button>
                    </form>

                    <p class="text-center text-sm font-medium text-gray-500">
                        Don't have an account?
                        <router-link
                            to="/register"
                            class="text-blue-500 hover:underline font-medium"
                        >
                            Register
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
import { Eye, EyeOff } from "lucide-vue-next";

export default {
    name: "Login",
    components: {
        Eye,
        EyeOff,
    },
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            showPassword: false,
            auth: useAuthStore(),
        };
    },
    methods: {
        async handleLogin() {
            try {
                await this.auth.login(this.form);
            } catch (e) {
                // Error handled in auth store
            }
        },
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>
