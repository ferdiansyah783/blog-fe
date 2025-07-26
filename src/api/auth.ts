import api from "../lib/axios";

export const authApi = {
  async login({ email, password }: { email: string; password: string }) {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });

    return response.data;
  },

  async logout() {
    await api.post("/api/auth/logout");
  },

  async me() {
    const response = await api.get("/api/auth/me");

    return response.data;
  },
};
