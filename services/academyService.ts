// ─────────────────────────────────────────────
//  Academy Service
//
//  Raw API call functions for academy operations.
//  These functions ONLY make the HTTP request and
//  return typed data. No state management here.
// ─────────────────────────────────────────────

import apiClient from "./api";
import { ACADEMY_ENDPOINTS } from "@/constants/api";

// ── Types ──────────────────────────────────────

export interface Academy {
    id: string;
    name: string;
    location?: string;
    logo?: string;
    coachName?: string;
    memberCount?: number;
}

export interface CreateAcademyPayload {
    name: string;
    location?: string;
    logo?: string;
}

export interface JoinAcademyPayload {
    academyId: string;
    inviteCode?: string;
}

// ── Service Functions ──────────────────────────

/**
 * Fetch all available academies (for selection screen).
 * Called from: selectAcademy.tsx
 */
export const getAllAcademies = async (): Promise<Academy[]> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.get(ACADEMY_ENDPOINTS.GET_ALL);
    // return response.data;
    throw new Error("getAllAcademies() not implemented yet");
};

/**
 * Fetch a single academy by ID.
 */
export const getAcademyById = async (id: string): Promise<Academy> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.get(ACADEMY_ENDPOINTS.GET_BY_ID(id));
    // return response.data;
    throw new Error("getAcademyById() not implemented yet");
};

/**
 * Create a new academy.
 * Called from: addAcademy screen
 */
export const createAcademy = async (payload: CreateAcademyPayload): Promise<Academy> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.post(ACADEMY_ENDPOINTS.CREATE, payload);
    // return response.data;
    throw new Error("createAcademy() not implemented yet");
};

/**
 * Join an existing academy.
 * Called from: selectAcademy.tsx
 */
export const joinAcademy = async (payload: JoinAcademyPayload): Promise<{ message: string }> => {
    // TODO: Implement when API is ready
    // const response = await apiClient.post(ACADEMY_ENDPOINTS.JOIN, payload);
    // return response.data;
    throw new Error("joinAcademy() not implemented yet");
};
