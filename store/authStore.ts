// ─────────────────────────────────────────────
//  Auth Store (Zustand)
//
//  Global state for:
//  • Current authenticated user
//  • JWT access & refresh tokens (persisted in SecureStore)
//  • isAuthenticated flag
//
//  Usage in any component:
//    const { user, isAuthenticated, setUser, logout } = useAuthStore();
// ─────────────────────────────────────────────

import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

// ── SecureStore Key Names ──────────────────────
export const SECURE_STORE_KEYS = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
};

// ── TypeScript Types ───────────────────────────
export interface User {
    id: string;
    fullName: string;
    email?: string;
    phone?: string;
    role?: "player" | "coach" | "academy_owner" | null;
    profileImage?: string;
    isOnboarded?: boolean;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isHydrated: boolean; // true once we've read from SecureStore on app boot

    // Actions
    setUser: (user: User) => void;
    setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
    logout: () => Promise<void>;
    hydrateFromStorage: () => Promise<void>; // Call once on app boot
}

// ── Store ──────────────────────────────────────
export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isHydrated: false,

    setUser: (user) => set({ user }),

    setTokens: async (accessToken, refreshToken) => {
        // Persist tokens to secure storage
        await SecureStore.setItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN, accessToken);
        await SecureStore.setItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN, refreshToken);
        set({ accessToken, isAuthenticated: true });
    },

    logout: async () => {
        // Clear tokens from secure storage and reset state
        await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
        await SecureStore.deleteItemAsync(SECURE_STORE_KEYS.REFRESH_TOKEN);
        set({ user: null, accessToken: null, isAuthenticated: false });
    },

    hydrateFromStorage: async () => {
        // Called on app boot to restore session if token exists
        const token = await SecureStore.getItemAsync(SECURE_STORE_KEYS.ACCESS_TOKEN);
        if (token) {
            set({ accessToken: token, isAuthenticated: true });
        }
        set({ isHydrated: true });
    },
}));
