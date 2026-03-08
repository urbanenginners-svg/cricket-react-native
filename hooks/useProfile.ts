// ─────────────────────────────────────────────
//  useProfile Hook
//
//  Connects User/Academy Services ↔ Auth Store.
//  Screens use this hook — never the service directly.
//
//  Provides:
//  • fetchProfile()             → profile.tsx
//  • handleUpdateProfile(data)  → updateProfile screen
//  • handleUpdateRole(role)     → selectRole.tsx
//  • handleUpdateOnboarding(data) → player/coach onboarding
// ─────────────────────────────────────────────

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
    getProfile,
    updateProfile,
    updateRole,
    updateOnboarding,
    UpdateProfilePayload,
    UpdateRolePayload,
    UpdateOnboardingPayload,
} from "@/services/userService";

export const useProfile = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { setUser } = useAuthStore();

    // ── Fetch Profile ──────────────────────────────
    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const user = await getProfile();
            setUser(user);
            return user;
        } catch (err: any) {
            setError(err?.response?.data?.message ?? err.message ?? "Failed to fetch profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ── Update Profile ─────────────────────────────
    const handleUpdateProfile = async (payload: UpdateProfilePayload) => {
        setLoading(true);
        setError(null);
        try {
            const user = await updateProfile(payload);
            setUser(user);
            return user;
        } catch (err: any) {
            setError(err?.response?.data?.message ?? err.message ?? "Failed to update profile");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ── Update Role ────────────────────────────────
    const handleUpdateRole = async (payload: UpdateRolePayload) => {
        setLoading(true);
        setError(null);
        try {
            const user = await updateRole(payload);
            setUser(user);
            return user;
        } catch (err: any) {
            setError(err?.response?.data?.message ?? err.message ?? "Failed to update role");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // ── Submit Onboarding Data ─────────────────────
    const handleUpdateOnboarding = async (payload: UpdateOnboardingPayload) => {
        setLoading(true);
        setError(null);
        try {
            const user = await updateOnboarding(payload);
            setUser(user);
            return user;
        } catch (err: any) {
            setError(err?.response?.data?.message ?? err.message ?? "Failed to save onboarding data");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        fetchProfile,
        handleUpdateProfile,
        handleUpdateRole,
        handleUpdateOnboarding,
    };
};
