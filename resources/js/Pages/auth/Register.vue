<template>
    <div class="flex min-h-screen p-3">
        <!-- Left Side: Register Form -->
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
                        Create Your Account
                    </h2>
                    <p class="text-gray-500 text-sm mb-8">
                        Register below to get started
                    </p>

                    <!-- Social Buttons -->
                    <div class="flex space-x-4 mb-4">
                        <button
                            class="flex items-center justify-center w-full px-4 py-2 font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            <img
                                src="../../../assets/icons/google.png"
                                alt="Google"
                                class="h-5 w-5 mr-2"
                            />
                            Sign up with Google
                        </button>
                        <button
                            class="flex items-center justify-center w-full px-4 py-2 font-semibold border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                            <img
                                src="../../../assets/icons/apple.png"
                                alt="Apple"
                                class="h-5 w-5 mr-2"
                            />
                            Sign up with Apple
                        </button>
                    </div>

                    <!-- Divider -->
                    <div class="flex items-center space-x-2 text-sm my-8">
                        <hr class="flex-1 text-gray-200" />
                        <span class="text-gray-400">or</span>
                        <div class="flex-1 border-t text-gray-200"></div>
                    </div>

                    <!-- Error Display -->
                    <div
                        v-if="auth.errors"
                        class="text-red-500 text-sm mb-4 space-y-1"
                    >
                        <div v-for="(error, field) in auth.errors" :key="field">
                            <p v-for="msg in error" :key="msg">{{ msg }}</p>
                        </div>
                    </div>

                    <!-- Register Form -->
                    <form
                        @submit.prevent="handleRegister"
                        class="space-y-5 mb-4"
                    >
                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Name</label
                            >
                            <input
                                type="text"
                                v-model="form.name"
                                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

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
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Password</label
                            >
                            <input
                                type="password"
                                v-model="form.password"
                                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-gray-700 mb-1"
                                >Confirm Password</label
                            >
                            <input
                                type="password"
                                v-model="form.password_confirmation"
                                class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium py-2.5 rounded-lg transition cursor-pointer"
                        >
                            <span v-if="auth.isLoading">Registering...</span>
                            <span v-else>Register</span>
                        </button>
                    </form>

                    <p class="text-center text-sm font-medium text-gray-500">
                        Already have an account?
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
    name: "Register",
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            auth: useAuthStore(),
        };
    },
    methods: {
        async handleRegister() {
            try {
                await this.auth.register(this.form);
            } catch (e) {
                // Error handled in store
            }
        },
    },
};
</script>
