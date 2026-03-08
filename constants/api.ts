// ─────────────────────────────────────────────
//  API Constants
//  All base URLs and endpoint paths live here.
//  Change BASE_URL once when your backend URL changes.
// ─────────────────────────────────────────────

export const BASE_URL = "https://your-api-base-url.com/api/v1"; // 🔴 Replace with your actual backend URL

// ── Auth ──────────────────────────────────────
export const AUTH_ENDPOINTS = {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
};

// ── User / Profile ────────────────────────────
export const USER_ENDPOINTS = {
    GET_PROFILE: "/user/profile",
    UPDATE_PROFILE: "/user/profile",
    UPDATE_ROLE: "/user/role",
    UPDATE_ONBOARDING: "/user/onboarding",
};

// ── Academy ───────────────────────────────────
export const ACADEMY_ENDPOINTS = {
    GET_ALL: "/academies",
    GET_BY_ID: (id: string) => `/academies/${id}`,
    CREATE: "/academies",
    UPDATE: (id: string) => `/academies/${id}`,
    JOIN: "/academies/join",
};
