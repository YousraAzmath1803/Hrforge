"use client";

import { keycloakService } from "@/lib/auth";

export function LoginButton() {
  const handleLogin = () => {
    keycloakService.login();
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Login with Keycloak
    </button>
  );
}
