import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getUserData } from '~/utils/localStorageUtils';
import { DependencyInjector } from '~/utils/dependencyInjector';
import { authApi } from '~/services/api/initClient';
import { CreateUserDto, LoginByEmail } from '~/services/api/open-api';
import { Tokens } from '~/core/constants';
import { AuthContext } from '~/features/auth/cotext/auth-context';
import { UserDto } from '~/services/api/open-api/models/UserDto';

//TODO add type for user

export interface AuthContextType {
  user?: UserDto;
  isAuthenticated: boolean;
  login: (payloadData: LoginByEmail) => Promise<void>;
  logout: () => void;
  loginWithToken: (token: string) => Promise<void>;
  refreshAccessToken: () => Promise<string>;
  register: (regPayload: CreateUserDto) => void;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(getUserData);
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem(Tokens.ACCESS_TOKEN)
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem(Tokens.REFRESH_TOKEN)
  );

  useEffect(() => {
    DependencyInjector.injectRefreshTokenMethod(refreshAccessToken);
    DependencyInjector.injectLogoutMethod(logout);
  }, []);

  const refreshAccessToken = async () => {
    try {
      const newTokens = await authApi.updateAccessToken({
        refreshTokenDto: {
          refreshToken,
        },
      });
      setAccessToken(newTokens.accessToken);
      setRefreshToken(newTokens.refreshToken);
      localStorage.setItem(Tokens.ACCESS_TOKEN, newTokens.accessToken);
      localStorage.setItem(Tokens.REFRESH_TOKEN, newTokens.refreshToken);
      return newTokens.accessToken;
    } catch (error) {
      console.log(22);
      logout();
    }
  };
  const login = async (loginPayload: LoginByEmail) => {
    try {
      const { user, token } = await authApi.login({
        loginByEmail: loginPayload,
      });
      localSaveAuthData(user, token);
      setAccessToken(token.accessToken);
      setRefreshToken(token.refreshToken);
      setUser(user);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {}
  };

  const loginWithToken = async (tempToken: string) => {
    try {
      const { user, token } = await authApi.tokenLogin({
        tempToken,
      });

      localSaveAuthData(user, token);
      setAccessToken(token.accessToken);
      setRefreshToken(token.refreshToken);
      setUser(user);
      navigate(location.state.from || '/protected-page');
    } catch (error) {}
  };

  const register = async (regPayload: CreateUserDto) => {
    const { user, token } = await authApi.signUp({
      createUserDto: regPayload,
    });

    localSaveAuthData(user, token);
    setAccessToken(token.accessToken);
    setRefreshToken(token.refreshToken);
    setUser(user);
    navigate('/protected-page');
  };

  const localSaveAuthData = (user: any, tokens: any) => {
    localStorage.setItem(Tokens.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(Tokens.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logout = async () => {
    try {
      localStorage.removeItem(Tokens.ACCESS_TOKEN);
      localStorage.removeItem(Tokens.REFRESH_TOKEN);
      localStorage.removeItem('user');
      setAccessToken(null);
      setRefreshToken(null);
      setUser(null);
      navigate('/');
      await authApi.logout({
        refreshTokenDto: {
          refreshToken,
        },
      });
    } catch (error) {}
  };

  const contextValue = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    refreshAccessToken,
    loginWithToken,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
