'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'INTERN' | 'SUPERVISOR' | 'CLIENT';
  department?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userRole: User['role'] | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock credentials for testing
const MOCK_USERS: Record<string, { user: User; password: string }> = {
  'superadmin@example.com': {
    password: 'superadmin123',
    user: {
      id: 1,
      email: 'superadmin@example.com',
      first_name: 'Super',
      last_name: 'Admin',
      role: 'SUPERADMIN',
    },
  },
  'admin.internship@example.com': {
    password: 'admin123',
    user: {
      id: 2,
      email: 'admin.internship@example.com',
      first_name: 'John',
      last_name: 'Admin',
      role: 'ADMIN',
    },
  },
  'supervisor.sales@example.com': {
    password: 'supervisor123',
    user: {
      id: 3,
      email: 'supervisor.sales@example.com',
      first_name: 'Robert',
      last_name: 'Sales Manager',
      role: 'SUPERVISOR',
    },
  },
  'supervisor.it@example.com': {
    password: 'supervisor123',
    user: {
      id: 4,
      email: 'supervisor.it@example.com',
      first_name: 'Alice',
      last_name: 'IT Manager',
      role: 'SUPERVISOR',
    },
  },
  'intern.general@example.com': {
    password: 'intern123',
    user: {
      id: 12,
      email: 'intern.general@example.com',
      first_name: 'Tom',
      last_name: 'General Intern',
      role: 'INTERN',
    },
  },
  'intern.it@example.com': {
    password: 'intern123',
    user: {
      id: 9,
      email: 'intern.it@example.com',
      first_name: 'David',
      last_name: 'IT Intern',
      role: 'INTERN',
    },
  },
  'client@fragranza.com': {
    password: 'client123',
    user: {
      id: 100,
      email: 'client@fragranza.com',
      first_name: 'Marco',
      last_name: 'Cliente',
      role: 'CLIENT',
    },
  },
  'buyer@customer.com': {
    password: 'buyer123',
    user: {
      id: 101,
      email: 'buyer@customer.com',
      first_name: 'Sofia',
      last_name: 'Buyer',
      role: 'CLIENT',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to restore session:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Try PHP endpoint first
      try {
        const response = await fetch('http://localhost/internship_system/api/auth/login.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem('auth_token', data.token);
          localStorage.setItem('auth_user', JSON.stringify(data.user));

          // Redirect based on role
          if (data.user.role === 'CLIENT') {
            router.push('/client');
          } else {
            router.push('/enterprise');
          }
          return;
        }
      } catch (apiError) {
        // Fall through to mock auth
        console.log('PHP API not available, using mock authentication');
      }

      // Fallback: Mock authentication for testing
      const mockAuth = MOCK_USERS[email];
      if (!mockAuth || mockAuth.password !== password) {
        throw new Error('Invalid email or password');
      }

      const mockUser = mockAuth.user;
      const mockToken = `mock_token_${Date.now()}`;

      setUser(mockUser);
      setToken(mockToken);
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('auth_user', JSON.stringify(mockUser));

      // Redirect based on role
      if (mockUser.role === 'CLIENT') {
        router.push('/client');
      } else {
        router.push('/enterprise');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    router.push('/');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    userRole: user?.role || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
