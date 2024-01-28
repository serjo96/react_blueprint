import initApiClient from '~/services/api/initClient';
import { ErrorHandler } from '~/services/ErrorHandler';

export type LoginPayload = {
  name: string;
  password: string
};

export type RegistrationPayload = {
  email: string,
  password: string
}

const httpClient = initApiClient

export default {
  loginUser: async (data: LoginPayload) => {
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
  register: async (data: RegistrationPayload)=> {
    try {
      const response: any = await httpClient.post('auth/registration', JSON.stringify(data));
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
  }
}
