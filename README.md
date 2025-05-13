# VueLaravel Starter Kit

A full-featured SPA starter template built using **Laravel 12**, **Vue.js 3**, **Pinia**, and **Axios**. This template is designed to save time and help you get started with new projects quickly, with authentication (Login, Signup, Forgot Password) and middleware already set up.

---

## ✨ Features

- ✅ **Laravel 12** backend (API-first architecture)
- ✅ **Vue.js 3** SPA frontend inside Laravel
- ✅ **Pinia** for state management
- ✅ **Axios** for API requests
- ✅ **Authentication** (Login, Signup, Forgot Password)
- ✅ **Middleware-protected routes**
- ✅ Clean folder structure
- ✅ Ready-to-extend and scale

---

## 📦 Tech Stack

- **Backend:** Laravel 12 (API Mode)
- **Frontend:** Vue 3 (inside Laravel)
- **State Management:** Pinia
- **HTTP Client:** Axios
- **Auth:** Laravel Sanctum or API Token (depending on setup)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/vue-laravel-starter-kit.git
cd vue-laravel-starter-kit
```

### 2. Install Backend Dependencies (Laravel)

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

> ⚙️ Make sure to configure your database credentials in `.env`.

### 3. Install Frontend Dependencies (Vue)

```bash
cd resources/js
npm install
npm run dev
```

---

## 📂 Folder Structure Overview

```
/app            -> Laravel app code
/resources/js   -> Vue 3 SPA with Pinia & Axios
/routes         -> API routes defined here
```

---

## 🛡️ Auth Flow

- Signup and Login with proper validation
- Forgot Password with email link (configure mail settings)
- Middleware-protected routes using Laravel Sanctum or token-based auth
- State management with Pinia
- Axios interceptors for auth token handling

---

## 🤝 Contributing

This project is open to contributions. Feel free to fork the repo and create a pull request if you'd like to improve it.

---

## 🧑‍💻 Author

**Faraz Khan**  
Freelance Web Developer  
[GitHub](https://github.com/your-username)  
[Email](mailto:f.skipper14@gmail.com)

---

## 🪪 License

This project is open-source and available under the [MIT License](LICENSE).
