import axios from "axios";

export const adminApi = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL,
  timeout: 15000
});

// TODO: Add auth token interceptor for admin role endpoints.
