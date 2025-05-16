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
        passwordResetEmail: null,
    }),
    getters: {
        isAuthenticated: (state) => {
            return !!state.token && !!state.user;
        },
        currentUser: (state) => state.user,
        isAdmin: (state) => state.user?.role === "admin",
        hasResetLinkBeenSent: (state) => !!state.resetStatus,
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

        async forgotPassword(email) {
            this.isLoading = true;
            this.errors = null;
            this.resetStatus = null;
            this.passwordResetEmail = email; // Store email for potential reuse

            try {
                const response = await axios.post("/api/forgot-password", {
                    email,
                });

                this.resetStatus = response.data.status;

                // Store the email for the reset password view
                localStorage.setItem("passwordResetEmail", email);

                toast.success("Password reset link sent to your email!");
                return { success: true, status: response.data.status };
            } catch (error) {
                this.handleAuthError(error);

                // Handle different error cases
                if (error.response?.status === 404) {
                    toast.error("No account found with this email address.");
                } else if (error.response?.status === 429) {
                    toast.error("Too many requests. Please try again later.");
                } else {
                    toast.error(
                        error.response?.data?.message ||
                            "Failed to send reset link. Please try again."
                    );
                }

                return { success: false, error: error.response?.data };
            } finally {
                this.isLoading = false;
            }
        },

        async resetPassword({ token, email, password, password_confirmation }) {
            this.isLoading = true;
            this.errors = null;
            this.resetStatus = null;

            try {
                const response = await axios.post("/api/reset-password", {
                    token,
                    email,
                    password,
                    password_confirmation,
                });

                this.resetStatus = response.data.status;
                this.clearResetData(); // Clear stored reset data

                toast.success(
                    "Password reset successfully! You can now login."
                );

                // Redirect to login after successful reset
                setTimeout(() => {
                    router.push("/login");
                }, 1500);

                return { success: true, data: response.data };
            } catch (error) {
                this.handleAuthError(error);

                // Handle specific error cases
                if (error.response?.status === 422) {
                    if (error.response.data.errors?.token) {
                        toast.error(
                            "The password reset token is invalid or has expired."
                        );
                    } else {
                        toast.error("Please correct the validation errors.");
                    }
                } else {
                    toast.error(
                        error.response?.data?.message ||
                            "Failed to reset password. Please try again."
                    );
                }

                return { success: false, error: error.response?.data };
            } finally {
                this.isLoading = false;
            }
        },

        // Helper method to clear reset-related data
        clearResetData() {
            this.passwordResetEmail = null;
            localStorage.removeItem("passwordResetEmail");
        },

        // Get the stored reset email (useful when coming back from email link)
        getStoredResetEmail() {
            return (
                localStorage.getItem("passwordResetEmail") ||
                this.passwordResetEmail
            );
        },

        setAuthData(data) {
            this.token = data.token;
            this.user = data.user;
            localStorage.setItem("token", this.token);
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${this.token}`;
        },

        init() {
            if (this.token) {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${this.token}`;
            }
        },

        async checkAuth() {
            if (!this.token) return false;

            // Set Axios token header
            axios.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${this.token}`;

            // Avoid re-fetching if already loaded
            if (this.user) return true;

            try {
                const response = await axios.get("/api/user");
                this.user = response.data;
                return true;
            } catch (error) {
                // Only reset auth if the token is truly invalid
                if (
                    error.response?.status === 401 ||
                    error.response?.status === 403
                ) {
                    this.resetAuth();
                }
                return false;
            }
        },

        async verifyToken() {
            if (!this.token) return false;

            try {
                const response = await axios.get("/api/verify-token");
                return response.data.valid;
            } catch (error) {
                this.resetAuth();
                return false;
            }
        },

        async fetchUser() {
            try {
                const response = await axios.get("/api/user");
                this.user = response.data;
                return true;
            } catch (error) {
                this.resetAuth();
                return false;
            }
        },

        resetAuth() {
            this.user = null;
            this.token = null;
            this.errors = null;
            this.clearResetData();
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
