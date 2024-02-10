import initApiClient from '~/services/api/initClient';
import { ErrorHandler } from '~/services/ErrorHandler';
import {RegistrationPayload} from "~/features/auth/AuthAPI";


const httpClient = initApiClient

export type UpdateProfilePayload = {
  name?: string
} & Partial<RegistrationPayload>

//TODO add types here
export default {
  getUserProfile: (id: string): any => {
    try {
      return httpClient.get(`users/${id}`);
    } catch (error) {
      ErrorHandler.handle(error);
    }
  },
  updateUserProfile: (id: string, data: UpdateProfilePayload) => {
    try {
      return  httpClient.post(`users/${id}`, JSON.stringify(data));

    } catch (error) {
      ErrorHandler.handle(error);
    }
  },

}
