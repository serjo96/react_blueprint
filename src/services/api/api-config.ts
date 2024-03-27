import { Configuration } from '~/services/api/open-api';
import { refreshTokenMiddleware } from '~/services/api/middleware/refresh-token.middleware';
import { errorHandlingMiddleware } from '~/services/api/middleware/error-handling.middleware';
import { Tokens } from '~/core/constants';
import config from '~/core/config';

export default new Configuration({
  basePath: config.apiUrl,
  accessToken: localStorage.getItem(Tokens.ACCESS_TOKEN) || '',
  middleware: [refreshTokenMiddleware, errorHandlingMiddleware],
});
