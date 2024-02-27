import {DependencyInjector} from "~/core/dependencyInjector";
import {RequestContext, ResponseContext} from "~/services/api/open-api";
import {Tokens} from "~/features/auth/cotext/auth-context";

export const refreshTokenMiddleware = {
  pre: async (context: RequestContext) => {
    return context;
  },
  post: async (context: ResponseContext) => {
    if (context.response.status === 403) {
      // Логика для обновления токена
      await DependencyInjector.refreshAccessToken();
      const token = localStorage.getItem(Tokens.ACCESS_TOKEN);
      // Повторный запрос с обновленным токеном
      return context.fetch(context.url, {
        ...context.init,
        headers: {
          ...context.init.headers,
          'Authorization': `Bearer ${token}`
        }
      });
    }
    return context.response;
  }
};
