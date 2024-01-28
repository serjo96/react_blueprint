import config from "~/core/config/config";
import ApiClient from '~/services/api/apiClient';

const options = {
  baseUrl: config.apiUrl
};

const client = new ApiClient('/v1/', options);
export default client;
