// User role types
export type UserRole = 'SUPERADMIN' | 'ADMIN' | 'SUPERVISOR' | 'INTERN';

// User interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
  course?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Login request payload
export interface LoginRequest {
  email: string;
  password: string;
}

// Login response payload
export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

// Authentication state
export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
