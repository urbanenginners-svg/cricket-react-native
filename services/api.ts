// ─────────────────────────────────────────────
//  Base API Client (Axios Instance)
//
//  • Attaches JWT token to every outgoing request automatically
//  • Handles 401 (Unauthorized) by clearing session and redirecting to login
//  • All services import and use this instance — not raw axios
// ─────────────────────────────────────────────

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "@/constants/api";
import { SECURE_STORE_KEYS } from "@/store/authStore";

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// ── Request Interceptor ────────────────────────
// Reads the stored JWT token and attaches it to the Authorization header
apiClient.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Response Interceptor ───────────────────────
// Handles global errors — e.g. 401 clears the session
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid — clear stored credentials
            await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
            await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
            // TODO: Redirect to login using expo-router when needed
            // router.replace("/(auth)/login");
        }
        return Promise.reject(error);
    }
);

export default apiClient;
