import React, { createContext, useEffect, useState } from 'react';

import {getUserData} from "~/utils/localStorageUtils";
import {DependencyInjector} from "~/utils/dependencyInjector";
import {authApi} from "~/services/api/initClient";
import {AuthControllerLoginRequest, CreateUserDto} from "~/services/api/open-api";

//TODO add type for user

export interface AuthContextType {
  user?: {id: string, email: string};
  isAuthenticated: boolean;
  login: (payloadData: AuthControllerLoginRequest) => Promise<void>;
  logout: () => void;
  loginWithToken: (token: string) => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  register: (regPayload: CreateUserDto) => void;
}

export enum Tokens {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken'
}


export const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState(getUserData);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(Tokens.ACCESS_TOKEN));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem(Tokens.REFRESH_TOKEN));


  useEffect(() => {
    DependencyInjector.injectRefreshTokenMethod(refreshAccessToken);
  }, []);

  const refreshAccessToken = async () => {
    try {
      const newTokens = await authApi.authControllerRefresh({refreshTokenDto: {
          refreshToken
        }});
      setAccessToken(newTokens.accessToken);
      setRefreshToken(newTokens.refreshToken);
      localStorage.setItem(Tokens.ACCESS_TOKEN, newTokens.accessToken);
      localStorage.setItem(Tokens.REFRESH_TOKEN, newTokens.refreshToken);
    } catch (error) {
      logout();
    }
  };
  const login = async (loginPayload: AuthControllerLoginRequest) => {
    try {
      const {user, token} = await authApi.authControllerLogin(loginPayload);
      localSaveAuthData(user, token)
      setAccessToken(token.accessToken);
      setRefreshToken(token.refreshToken);
      setUser(user);
    } catch (error) {

    }

  };

  const loginWithToken = async (tempToken: string) => {
    try {
      const {user, token} = await authApi.authControllerLoginWithTempToken({
        tempToken
      });

      localSaveAuthData(user, token)
      setAccessToken(token.accessToken);
      setRefreshToken(token.refreshToken);
      setUser(user);
    } catch (error) {

    }
  }

  const register = async (regPayload: CreateUserDto) => {
    try {
      const {user, token} = await authApi.authControllerRegister({
        createUserDto: regPayload
      });

      localSaveAuthData(user, token)
      setAccessToken(token.accessToken);
      setRefreshToken(token.refreshToken);
      setUser(user);
    } catch (error) {

    }
  };

  const localSaveAuthData = (user: any, tokens: any) => {
    localStorage.setItem(Tokens.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(Tokens.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const logout = () => {
    localStorage.removeItem(Tokens.ACCESS_TOKEN);
    localStorage.removeItem(Tokens.REFRESH_TOKEN);
    localStorage.setItem('user', JSON.stringify(user));
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    // navigate('/login');
  };


  const contextValue = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    refreshAccessToken,
    loginWithToken,
    logout
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
