'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  system: string;
  roles: string[];
  permissions: string[];
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  system: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string, system: string) => Promise<void>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
  switchSystem: (newSystem: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [system, setSystem] = useState<string>('internship');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load auth from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setToken(parsed.token);
        setUser(parsed.user);
        setSystem(parsed.user?.system || 'internship');
      } catch (err) {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const login = async (email: string, password: string, requestedSystem: string = 'internship') => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('http://localhost/internship-system/api/auth/login-multisystem.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          system: requestedSystem
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }

      const userData = data.user;
      setToken(data.token);
      setUser(userData);
      setSystem(userData.system);

      // Save to localStorage
      localStorage.setItem('auth', JSON.stringify({
        token: data.token,
        user: userData
      }));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed';
      setError(errorMsg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setSystem('internship');
    localStorage.removeItem('auth');
  };

  const hasRole = (role: string): boolean => {
    return user?.roles?.includes(role) || false;
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions?.includes(permission) || false;
  };

  const switchSystem = (newSystem: string) => {
    if (user) {
      setSystem(newSystem);
      setUser({
        ...user,
        system: newSystem
      });
      // In production, would need to re-authenticate for new system
      // and fetch new roles/permissions
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        system,
        isAuthenticated: !!user && !!token,
        isLoading,
        error,
        login,
        logout,
        hasRole,
        hasPermission,
        switchSystem
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
