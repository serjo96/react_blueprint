import {ResponseContext} from "~/services/api/open-api";
import {ErrorHandler} from "~/services/ErrorHandler";

export const errorHandlingMiddleware = {
  post: async (context: ResponseContext) => {
    let returnData = context.response;
    if (!context.response.ok) {
      // Handle API responses with errors
      const error = await context.response.json();
      ErrorHandler.handle(error);
      returnData = error;
    }
    return returnData;
  }
};
