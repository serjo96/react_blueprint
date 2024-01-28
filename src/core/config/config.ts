import { validateConfig } from '~/core/config/validateConfig';

validateConfig(process.env);

const config = {
  apiUrl: process.env.REACT_APP_API_BASE_URL,
  processEnv: process.env.NODE_ENV,
};
export default config;
