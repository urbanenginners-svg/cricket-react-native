// ─────────────────────────────────────────────
//  useAuth Hook
//
//  Connects Auth Service ↔ Auth Store.
//  Screens use this hook — never the service directly.
//
//  Provides:
//  • handleRegister(payload)  → createAccount.tsx
//  • handleLogin(payload)     → login.tsx
//  • handleVerifyOtp(payload) → verifyOtp.tsx
//  • handleResendOtp(phone)   → verifyOtp.tsx
//  • handleLogout()           → profile / settings
//  • loading, error states
// ─────────────────────────────────────────────

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import {
  register,
  login,
  verifyOtp,
  resendOtp,
  logout,
  RegisterPayload,
  LoginPayload,
  VerifyOtpPayload,
} from "@/services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setUser, setTokens, logout: clearStore } = useAuthStore();

  // ── Register ──────────────────────────────────
  const handleRegister = async (payload: RegisterPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(payload);
      //   await setTokens(data.accessToken, data.refreshToken);
      return data;
    } catch (err: any) {
      console.log(err, ">>>>> ERROR");
      setError(
        err?.response?.data?.message ?? err.message ?? "Registration failed",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ── Login ─────────────────────────────────────
  const handleLogin = async (payload: LoginPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(payload);
      setUser(data.user as any);
      await setTokens(data.access_token);
      return data;
    } catch (err: any) {
      setError(err?.response?.data?.message ?? err.message ?? "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ── Verify OTP ────────────────────────────────
  const handleVerifyOtp = async (payload: VerifyOtpPayload) => {
    setLoading(true);
    setError(null);
    try {
      const data = await verifyOtp(payload);
      console.log(data, ">>>>> OTP VERIFIED");
      setUser(data.user as any);
      await setTokens(data.access_token);
      return data;
    } catch (err: any) {
      console.log(err.response.data, ">>>>> OTP VERIFICATION FAILED");
      setError(
        err?.response?.data?.message ??
          err.message ??
          "OTP verification failed",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ── Resend OTP ────────────────────────────────
  const handleResendOtp = async (phone: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await resendOtp(phone);
      return data;
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? err.message ?? "Failed to resend OTP",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ── Logout ────────────────────────────────────
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
    } catch {
      // Even if server-side logout fails, clear local state
    } finally {
      await clearStore();
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleRegister,
    handleLogin,
    handleVerifyOtp,
    handleResendOtp,
    handleLogout,
  };
};
