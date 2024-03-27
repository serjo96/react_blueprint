import { AuthApi, UsersApi } from '~/services/api/open-api';
import apiConfig from '~/services/api/api-config';

const usersApi = new UsersApi(apiConfig);
const authApi = new AuthApi(apiConfig);

export { usersApi, authApi };
