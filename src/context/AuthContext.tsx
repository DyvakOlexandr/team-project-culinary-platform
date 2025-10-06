import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, setAccessToken, refreshToken } from '../api';

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  // Проверка токена при монтировании
  useEffect(() => {
    (async () => {
      const access = await refreshToken();
      if (access) setUser('user'); // можно заменить на реальное имя с API
    })();
  }, []);

  const login = async (username: string, password: string) => {
    await apiLogin(username, password);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
