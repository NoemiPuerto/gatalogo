"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LogoutButton({ className = "" }) {
  const [loggingOut, setLoggingOut] = useState(false);

  async function logout() {
    setLoggingOut(true);
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      setLoggingOut(false);
      toast.error("Could not sign out");
      return;
    }
    toast.success("Signed out");
    window.location.href = "/";
  }

  return (
    <button type="button" onClick={logout} disabled={loggingOut} className={`rounded-full border border-red-200 bg-white px-5 py-3 font-bold text-red-600 shadow-sm transition hover:bg-red-50 disabled:opacity-60 ${className}`}>
      {loggingOut ? "Signing out..." : "Sign out"}
    </button>
  );
}
