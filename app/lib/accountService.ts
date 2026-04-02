import { AccountProfile, UpdateProfileRequest, ChangePasswordRequest, UserPreferences, UpdatePreferencesRequest, ActivityLog, ApiResponse } from '@/app/types/account';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/internship-system/api';

// Get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('auth');
    if (data) {
      try {
        return JSON.parse(data).token;
      } catch {
        return null;
      }
    }
  }
  return null;
};

// Generic fetch wrapper with auth
const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
};

// Account Service
export const accountService = {
  // Profile endpoints
  getProfile: async (): Promise<ApiResponse<AccountProfile>> => {
    return fetchWithAuth(`${API_BASE_URL}/account/profile.php`, {
      method: 'GET',
    });
  },

  updateProfile: async (data: UpdateProfileRequest): Promise<ApiResponse<AccountProfile>> => {
    return fetchWithAuth(`${API_BASE_URL}/account/profile.php`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Security endpoints
  changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse<{ message: string }>> => {
    return fetchWithAuth(`${API_BASE_URL}/account/security.php`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Preferences endpoints
  getPreferences: async (): Promise<ApiResponse<UserPreferences>> => {
    return fetchWithAuth(`${API_BASE_URL}/account/preferences.php`, {
      method: 'GET',
    });
  },

  updatePreferences: async (data: UpdatePreferencesRequest): Promise<ApiResponse<UserPreferences>> => {
    return fetchWithAuth(`${API_BASE_URL}/account/preferences.php`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Activity log endpoints
  getActivityLog: async (limit: number = 50): Promise<ApiResponse<ActivityLog[]>> => {
    return fetchWithAuth(`${API_BASE_URL}/account/activity.php?limit=${limit}`, {
      method: 'GET',
    });
  },

  // Account deletion (requires password confirmation)
  deleteAccount: async (password: string): Promise<ApiResponse<{ message: string }>> => {
    return fetchWithAuth(`${API_BASE_URL}/account/delete.php`, {
      method: 'POST',
      body: JSON.stringify({ password }),
    });
  },
};
