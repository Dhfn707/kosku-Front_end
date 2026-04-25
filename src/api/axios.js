import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
  withXSRFToken: true, // Required for Laravel 13+ Sanctum
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Handle 419 (CSRF token mismatch) - Retry once
    if (response?.status === 419 && !config._retry) {
      config._retry = true;
      try {
        await api.get("/sanctum/csrf-cookie");
        return api(config);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    if (response?.status === 401) {
      // User is unauthorized - clear local state if needed
      console.error("Unauthorized access");
    }
    
    return Promise.reject(error);
  }
);

export default api;
