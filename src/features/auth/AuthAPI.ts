import initApiClient from '~/services/api/initClient';
import { ErrorHandler } from '~/services/ErrorHandler';

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean
};

export type RegistrationPayload = {
  email: string,
  password: string
}

type TokenValidationErrorResponse = {
  message: string;
  payload?: {
    unlockTime?: number
  }
}

const httpClient = initApiClient

export default {
  login: async (data: LoginPayload) => {
    try {
      const response: any = await httpClient.post('auth/login', JSON.stringify(data));
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  },
  loginWithToken: async (tempToken: string) => {
    try {
      const response: any = await httpClient.post(`api/token-login?tempToken=${tempToken}`);
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  },
  register: async (data: RegistrationPayload)=> {
    try {
      const response: any = await httpClient.post('auth/sign-up', JSON.stringify(data));
      return {
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      ErrorHandler.handle(error);
    }
  },
  refreshToken: (refreshToken: string)=> {
    try {
      return httpClient.post('auth/refreshToken', JSON.stringify(refreshToken));
    } catch (error) {
      ErrorHandler.handle(error);
    }
  },
  resetPassword: (email: string)=> {
    try {
      return httpClient.get<string, TokenValidationErrorResponse>(`auth/forgot-password/${email}`);
    } catch (error) {
      if(error.payload?.unlockTime) {
        return {
          message: error.message,
          unlockTime: error.payload.unlockTime
        }
      }
      ErrorHandler.handle(error);
    }
  },
  resendConfirmationToken(email: string) {
    try {
      return httpClient.get(`auth/resend-verification/${email}`);
    } catch (error) {
      if(error.payload?.unlockTime) {
        return {
          message: error.message,
          unlockTime: error.payload.unlockTime
        }
      }
      ErrorHandler.handle(error);
    }
  }

}
