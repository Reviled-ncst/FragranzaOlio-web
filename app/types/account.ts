// Account profile data
export interface AccountProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  department?: string;
  course?: string;
  bio?: string;
  avatar_url?: string;
}

// Profile update payload
export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  bio?: string;
  avatar_url?: string;
}

// Password change request
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

// User preferences
export interface UserPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  weekly_digest: boolean;
  marketing_emails: boolean;
  sms_notifications: boolean;
  private_profile: boolean;
  show_activity: boolean;
  theme: 'light' | 'dark' | 'auto';
}

// Update preferences payload
export interface UpdatePreferencesRequest {
  email_notifications?: boolean;
  weekly_digest?: boolean;
  marketing_emails?: boolean;
  sms_notifications?: boolean;
  private_profile?: boolean;
  show_activity?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

// Activity log entry
export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  details?: string;
  ip_address?: string;
  user_agent?: string;
  timestamp: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string>;
}
