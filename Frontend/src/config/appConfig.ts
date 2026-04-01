export const appConfig = {
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:8000",
  appEnv: process.env.EXPO_PUBLIC_APP_ENV || "development"
} as const;
