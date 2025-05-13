import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import { toast } from "vue3-toastify";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null,
        isLoading: false,
        errors: null,
        resetStatus: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
        currentUser: (state) => state.user,
        isAdmin: (state) => state.user?.role === "admin",
    },
    actions: {
        async login(credentials) {
            this.isLoading = true;
            this.errors = null;

            try {
                const response = await axios.post("/api/login", credentials);
                this.setAuthData(response.data);

                const redirect =
                    router.currentRoute.value.query.redirect || "/dashboard";
                await router.push(redirect);

                toast.success("Login successful!");
                return { success: true };
            } catch (error) {
                this.handleAuthError(error);
                toast.error(
                    error.response?.data?.message ||
                        "Login failed. Please try again."
                );
                return { success: false };
            } finally {
                this.isLoading = false;
            }
        },

        async register(userData) {
            this.isLoading = true;
            this.errors = null;

            try {
                const response = await axios.post("/api/register", userData);
                this.setAuthData(response.data);

                await router.push("/dashboard");
                toast.success("Registration successful!");
                return { success: true };
            } catch (error) {
                this.handleAuthError(error);
                toast.error(
                    error.response?.data?.message || "Registration failed."
                );
                return { success: false };
            } finally {
                this.isLoading = false;
            }
        },

        async logout() {
            try {
                await axios.post("/api/logout");
                this.resetAuth();
                await router.push("/login");
                toast.success("Logged out successfully.");
            } catch (error) {
                console.error("Logout error:", error);
                this.resetAuth(); // Force logout even if API fails
                toast.warning("Force logged out due to session error.");
            }
        },

        async fetchUser() {
            try {
                const response = await axios.get("/api/user");
                this.user = response.data;
                toast.success("User data fetched successfully.");
                return this.user;
            } catch (error) {
                this.resetAuth();
                toast.error("Failed to fetch user. Please log in again.");
                throw error;
            }
        },

        async forgotPassword(email) {
            this.isLoading = true;
            this.errors = null;
            this.resetStatus = null;

            try {
                const response = await axios.post("/api/forgot-password", {
                    email,
                });
                this.resetStatus = response.data.status;
                toast.success("Password reset link sent to your email!");
                return { success: true };
            } catch (error) {
                this.handleAuthError(error);
                toast.error(
                    error.response?.data?.message ||
                        "Failed to send reset link. Please try again."
                );
                return { success: false };
            } finally {
                this.isLoading = false;
            }
        },

        async resetPassword(resetData) {
            this.isLoading = true;
            this.errors = null;
            this.resetStatus = null;

            try {
                const response = await axios.post(
                    "/api/reset-password",
                    resetData
                );
                this.resetStatus = response.data.status;
                toast.success(
                    "Password reset successfully! You can now login."
                );

                // Redirect to login after successful reset
                setTimeout(() => {
                    router.push("/login");
                }, 1500);

                return { success: true };
            } catch (error) {
                this.handleAuthError(error);
                toast.error(
                    error.response?.data?.message ||
                        "Failed to reset password. Please try again."
                );
                return { success: false };
            } finally {
                this.isLoading = false;
            }
        },

        setAuthData(data) {
            this.token = data.token;
            this.user = data.user;
            localStorage.setItem("token", this.token);
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${this.token}`;
        },

        resetAuth() {
            this.user = null;
            this.token = null;
            this.errors = null;
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
        },

        hasPermission(permission) {
            if (!this.user || !this.user.permissions) return false;
            return this.user.permissions.includes(permission);
        },

        handleAuthError(error) {
            if (error.response?.status === 422) {
                this.errors = error.response.data.errors;
            } else {
                this.errors = {
                    general: [error.message || "Something went wrong."],
                };
            }
        },
    },
});
