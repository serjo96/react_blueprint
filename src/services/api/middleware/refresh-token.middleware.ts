import {RequestContext, ResponseContext} from "~/services/api/open-api";
import {Tokens} from "~/features/auth/cotext/auth-context";
import {DependencyInjector} from "~/utils/dependencyInjector";

export const refreshTokenMiddleware = {
  pre: async (context: RequestContext) => {
    return context;
  },
  post: async (context: ResponseContext) => {
    if (context.response.status === 403) {
      // Logic to update the token
      await DependencyInjector.refreshAccessToken();
      const token = localStorage.getItem(Tokens.ACCESS_TOKEN);
      // Re-request with updated token
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
