import React, { createContext, useEffect, useState } from 'react';

import AuthAPI, { LoginPayload, RegistrationPayload } from '~/features/auth/AuthAPI';
import initApiClient from '~/services/api/initClient';

export interface AuthContextType {
  user: unknown;
  isAuthenticated: boolean;
  login: (payloadData: LoginPayload) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  register: (regPayload: RegistrationPayload) => void;
}

export enum Tokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken'
}


export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(Tokens.ACCESS_TOKEN));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem(Tokens.REFRESH_TOKEN));


  useEffect(() => {
    initApiClient.setRefreshTokenMethod(refreshAccessToken);
  }, []);

  const refreshAccessToken = async () => {
    try {
      const newTokens: any = await AuthAPI.refreshToken(refreshToken);
      setAccessToken(newTokens.accessToken);
      setRefreshToken(newTokens.refreshToken);
      localStorage.setItem(Tokens.ACCESS_TOKEN, newTokens.accessToken);
      localStorage.setItem(Tokens.REFRESH_TOKEN, newTokens.refreshToken);
    } catch (error) {
      logout();
    }
  };
  const login = async (loginPayload: LoginPayload) => {
    const {user, token} = await AuthAPI.loginUser(loginPayload);

    localStorage.setItem(Tokens.ACCESS_TOKEN, token.accessToken);
    localStorage.setItem(Tokens.REFRESH_TOKEN, token.refreshToken);
    setAccessToken(token.accessToken);
    setRefreshToken(token.refreshToken);
    setUser(user);
    // navigate('/calendar')
  };

  const logout = () => {
    localStorage.removeItem(Tokens.ACCESS_TOKEN);
    localStorage.removeItem(Tokens.REFRESH_TOKEN);
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    // navigate('/login');
  };

  const register = async (regPayload: RegistrationPayload) => {
    const {user, token} = await AuthAPI.register(regPayload);
    localStorage.setItem(Tokens.ACCESS_TOKEN, token.accessToken);
    localStorage.setItem(Tokens.REFRESH_TOKEN, token.refreshToken);
    setAccessToken(token.accessToken);
    setRefreshToken(token.refreshToken);
    setUser(user);
    // navigate('/calendar')
  };

  const contextValue = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    refreshAccessToken,
    logout
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
