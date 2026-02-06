// API Configuration
// This file centralizes API configuration and uses environment variables
// for different deployment environments (development, production, etc.)

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    ai: '/api/ai',
  },
};

// Helper function to construct full API URLs
export const getApiUrl = (endpoint) => {
  return `${apiConfig.baseURL}${endpoint}`;
};

export default apiConfig;
