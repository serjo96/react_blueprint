import {ResponseError} from "~/services/api/open-api";

export async function extractErrorData<T>(error: ResponseError): Promise<T> {
  return error.response as T;
}
