import axios from "axios";

export class KeycloakService {
  static instance;

  constructor() {
    this.config = {
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "",
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "",
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || "",
      baseUrl: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "",
    };

    // Store tokens and expiry
    this.accessToken = null;
    this.refreshToken = null;
    this.expiresIn = 0;
    this.refreshExpiresIn = 0;

    // Create axios instance
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  static getInstance() {
    if (!KeycloakService.instance) {
      KeycloakService.instance = new KeycloakService();
    }
    return KeycloakService.instance;
  }

  // Initialize login
  login = async () => {
    const redirectUri = window.location.origin + "/auth/callback";
    const state = this.generateRandomString();
    const codeVerifier = this.generateRandomString();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    // Store state and code verifier for verification
    sessionStorage.setItem("oauth2_state", state);
    sessionStorage.setItem("code_verifier", codeVerifier);

    const authUrl = this.buildAuthUrl(redirectUri, state, codeChallenge);
    window.location.href = authUrl;
  };

  // Handle the callback from Keycloak
  handleCallback = async (code, state) => {
    const storedState = sessionStorage.getItem("oauth2_state");
    const codeVerifier = sessionStorage.getItem("code_verifier");

    if (state !== storedState) {
      throw new Error("Invalid state parameter");
    }

    const tokens = await this.getTokens(code, codeVerifier);
    this.setTokens(tokens);
    return tokens;
  };

  // Get new tokens using refresh token
  refreshAccessToken = async () => {
    if (!this.refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await this.axiosInstance.post(
        `/realms/${this.config.realm}/protocol/openid-connect/token`,
        new URLSearchParams({
          grant_type: "refresh_token",
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: this.refreshToken,
        })
      );

      this.setTokens(response.data);
      return response.data;
    } catch (error) {
      this.clearTokens();
      throw error;
    }
  };

  // Logout
  logout = async () => {
    try {
      await this.axiosInstance.post(
        `/realms/${this.config.realm}/protocol/openid-connect/logout`,
        new URLSearchParams({
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          refresh_token: this.refreshToken,
        })
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.clearTokens();
      window.location.href = "/";
    }
  };

  // Helper methods
  buildAuthUrl(redirectUri, state, codeChallenge) {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.config.clientId,
      redirect_uri: redirectUri,
      state: state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
      scope: "openid profile email",
    });

    return `${this.config.baseUrl}/realms/${
      this.config.realm
    }/protocol/openid-connect/auth?${params.toString()}`;
  }

  async getTokens(code, codeVerifier) {
    const redirectUri = window.location.origin + "/auth/callback";

    try {
      const response = await this.axiosInstance.post(
        `/realms/${this.config.realm}/protocol/openid-connect/token`,
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code: code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        })
      );

      return response.data;
    } catch (error) {
      console.error("Token exchange error:", error);
      throw error;
    }
  }

  async generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  setTokens(tokens) {
    this.accessToken = tokens.access_token;
    this.refreshToken = tokens.refresh_token;
    this.expiresIn = tokens.expires_in;
    this.refreshExpiresIn = tokens.refresh_expires_in;

    // Store tokens securely
    sessionStorage.setItem("access_token", tokens.access_token);
    sessionStorage.setItem("refresh_token", tokens.refresh_token);
  }

  clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    sessionStorage.removeItem("oauth2_state");
    sessionStorage.removeItem("code_verifier");
  }

  generateRandomString() {
    const array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
      ""
    );
  }

  // Getters for tokens
  getAccessToken() {
    return this.accessToken;
  }

  isAuthenticated() {
    return !!this.accessToken;
  }
}

// Export singleton instance
export const keycloakService = KeycloakService.getInstance();
