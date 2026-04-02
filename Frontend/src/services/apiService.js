import axios from "axios";

import { appConfig } from "../config/appConfig";

export const apiService = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 15000
});

// TODO: Add auth headers/interceptors in one place only.
