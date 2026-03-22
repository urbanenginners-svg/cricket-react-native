// ─────────────────────────────────────────────
//  User Service
//
//  Raw API call functions for user profile.
//  These functions ONLY make the HTTP request and
//  return typed data. No state management here.
//
//  All functions are called from the useProfile() hook.
// ─────────────────────────────────────────────

import apiClient from "./api";
import { USER_ENDPOINTS } from "@/constants/api";
import { User } from "@/store/authStore";
import { Role } from "@/store/onboardingStore";

// ── Request / Response Types ───────────────────

export interface UpdateProfilePayload {
    fullName?: string;
    profileImage?: string;  // URL or base64
    dateOfBirth?: string;
    gender?: string;
    placeOfBirth?: string;
}

export interface UpdateRolePayload {
    role: Role;
}

export interface UpdateOnboardingPayload {
    battingStyle?: string;
    bowlingStyle?: string;
    playerType?: string;
    playingPosition?: string;
    specialization?: string;   // for coaches
    experience?: number;       // for coaches
}

// ── Service Functions ──────────────────────────

/**
 * Get the logged-in user's profile.
 * Called from: profile.tsx
 */
export const getProfile = async (): Promise<User> => {
    // TODO: Implement when API is ready
    const response = await apiClient.get(USER_ENDPOINTS.GET_PROFILE);
    return response.data;
};

/**
 * Update basic user profile info.
 * Called from: updateProfile screen
 */
export const updateProfile = async (payload: UpdateProfilePayload): Promise<User> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.put(USER_ENDPOINTS.UPDATE_PROFILE, payload);
    // return response.data;
    throw new Error("updateProfile() not implemented yet");
};

/**
 * Set the user's role (player / coach / academy_owner).
 * Called from: selectRole.tsx
 */
export const updateRole = async (payload: UpdateRolePayload): Promise<User> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.put(USER_ENDPOINTS.UPDATE_ROLE, payload);
    // return response.data;
    throw new Error("updateRole() not implemented yet");
};

/**
 * Submit onboarding profile data (player/coach specifics).
 * Called from: playerOnboarding / coachOnboarding screens
 */
export const updateOnboarding = async (payload: UpdateOnboardingPayload): Promise<User> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.put(USER_ENDPOINTS.UPDATE_ONBOARDING, payload);
    // return response.data;
    throw new Error("updateOnboarding() not implemented yet");
};
