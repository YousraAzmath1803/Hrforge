"use client";

import { keycloakService } from "@/lib/auth";

export function LogoutButton() {
  const handleLogout = () => {
    keycloakService.logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
}
