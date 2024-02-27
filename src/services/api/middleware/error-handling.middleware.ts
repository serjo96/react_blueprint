import {ResponseContext} from "~/services/api/open-api";
import {ErrorHandler} from "~/services/ErrorHandler";

export const errorHandlingMiddleware = {
  post: async (context: ResponseContext) => {
    if (!context.response.ok) {
      // Handle API responses with errors
      const error = await context.response.json();
      ErrorHandler.handle(error);
    }
    return context.response;
  }
};
