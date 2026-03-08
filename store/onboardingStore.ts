// ─────────────────────────────────────────────
//  Onboarding Store (Zustand)
//
//  Holds temporary state while the user moves
//  through multi-step onboarding screens.
//  Cleared after onboarding is complete.
//
//  Usage:
//    const { role, setRole } = useOnboardingStore();
// ─────────────────────────────────────────────

import { create } from "zustand";

// ── Types ──────────────────────────────────────
export type Role = "player" | "coach" | "academy_owner" | null;

export interface PlayerProfile {
    battingStyle?: string;
    bowlingStyle?: string;
    playerType?: string;       // e.g. "all-rounder", "batsman"
    playingPosition?: string;
}

export interface CoachProfile {
    specialization?: string;
    experience?: number;
    certifications?: string[];
}

interface OnboardingState {
    role: Role;
    selectedAcademyId: string | null;
    playerProfile: PlayerProfile;
    coachProfile: CoachProfile;

    // Actions
    setRole: (role: Role) => void;
    setSelectedAcademy: (academyId: string) => void;
    setPlayerProfile: (data: Partial<PlayerProfile>) => void;
    setCoachProfile: (data: Partial<CoachProfile>) => void;
    resetOnboarding: () => void;
}

const initialState = {
    role: null as Role,
    selectedAcademyId: null as string | null,
    playerProfile: {} as PlayerProfile,
    coachProfile: {} as CoachProfile,
};

// ── Store ──────────────────────────────────────
export const useOnboardingStore = create<OnboardingState>((set) => ({
    ...initialState,

    setRole: (role) => set({ role }),

    setSelectedAcademy: (academyId) => set({ selectedAcademyId: academyId }),

    setPlayerProfile: (data) =>
        set((state) => ({ playerProfile: { ...state.playerProfile, ...data } })),

    setCoachProfile: (data) =>
        set((state) => ({ coachProfile: { ...state.coachProfile, ...data } })),

    resetOnboarding: () => set(initialState),
}));
