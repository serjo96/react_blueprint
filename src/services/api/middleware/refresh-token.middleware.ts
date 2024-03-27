import {
  ErrorContext,
  RequestContext,
  ResponseContext,
} from '~/services/api/open-api';
import { DependencyInjector } from '~/utils/dependencyInjector';

export const refreshTokenMiddleware = {
  post: async (context: ResponseContext) => {
    if (context.response.status === 403) {
      if (DependencyInjector.isRetryAttempt) {
        return await DependencyInjector.logout();
      }

      const accessToken = await DependencyInjector.refreshAccessToken();
      DependencyInjector.changeRetryAttempt(true);
      return context.fetch(context.url, {
        ...context.init,
        headers: {
          ...context.init.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else if (context.response.status === 401) {
      await DependencyInjector.logout();
    }
    return context.response;
  },
};
