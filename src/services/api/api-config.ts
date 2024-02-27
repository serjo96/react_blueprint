import {Configuration} from "~/services/api/open-api";
import {refreshTokenMiddleware} from "~/services/api/middleware/refresh-token.middleware";
import {errorHandlingMiddleware} from "~/services/api/middleware/error-handling.middleware";
import config from "~/core/config/config";

export default new Configuration({
  basePath: config.apiUrl,
  middleware: [refreshTokenMiddleware, errorHandlingMiddleware]
})
