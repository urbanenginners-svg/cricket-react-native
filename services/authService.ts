// ─────────────────────────────────────────────
//  Auth Service
//
//  Raw API call functions for authentication.
//  These functions ONLY make the HTTP request and
//  return typed data. No state management here.
//
//  All functions are called from the useAuth() hook.
// ─────────────────────────────────────────────

import apiClient from "./api";
import { AUTH_ENDPOINTS } from "@/constants/api";

// ── Request / Response Types ───────────────────

export interface RegisterPayload {
    fullName: string;
    phone: string;
    gender: string;
    dateOfBirth: string;    // ISO string: "YYYY-MM-DD"
    placeOfBirth: string;
}

export interface LoginPayload {
    phone: string;
    password?: string;      // depending on your backend auth strategy
}

export interface VerifyOtpPayload {
    phone: string;
    otp: string;
}

export interface AuthResponse {
    user: {
        id: string;
        fullName: string;
        phone: string;
        role: string | null;
        isOnboarded: boolean;
    };
    accessToken: string;
    refreshToken: string;
}

// ── Service Functions ──────────────────────────

/**
 * Register a new user account.
 * Called from: createAccount.tsx
 */
export const register = async (payload: RegisterPayload): Promise<AuthResponse> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.post(AUTH_ENDPOINTS.REGISTER, payload);
    // return response.data;
    throw new Error("register() not implemented yet");
};

/**
 * Log in an existing user.
 * Called from: login.tsx
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.post(AUTH_ENDPOINTS.LOGIN, payload);
    // return response.data;
    throw new Error("login() not implemented yet");
};

/**
 * Verify OTP sent to the user's phone.
 * Called from: verifyOtp.tsx
 */
export const verifyOtp = async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.post(AUTH_ENDPOINTS.VERIFY_OTP, payload);
    // return response.data;
    throw new Error("verifyOtp() not implemented yet");
};

/**
 * Resend OTP to the user's phone.
 * Called from: verifyOtp.tsx
 */
export const resendOtp = async (phone: string): Promise<{ message: string }> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.post(AUTH_ENDPOINTS.RESEND_OTP, { phone });
    // return response.data;
    throw new Error("resendOtp() not implemented yet");
};

/**
 * Logout the current user (server-side session invalidation).
 * Called from: profile screen / settings
 */
export const logout = async (): Promise<void> => {
    // TODO: Implement when API is ready
    // await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
    throw new Error("logout() not implemented yet");
};
