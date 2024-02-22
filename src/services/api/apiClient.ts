import { Tokens } from '~/features/auth/cotext/auth-context';

function isAbsolutePath (url: string) {
  return !url.match('/')[0];
}

interface ApiRequestOptions extends RequestInit {
  baseUrl?: string
}

export interface ClientResponse<T> {
  status: number;
  data: T;
  isSuccessRequest: boolean
}

type queryParams = { [key: string]: string | number | null | boolean | Array<string | number | null | boolean> | void}

export class ResponseError<E = any> extends Error {
    code: number;
    response: Response;
    constructor (resp: Response) {
      super(resp.statusText);
      this.code = resp.status;
      this.response = resp;
      Object.setPrototypeOf(this, ResponseError.prototype);
    }
}

export default class ApiClient {
    url: string;
    headers: HeadersInit;
    queryParams: {[key: string]: string} = {};
    options: RequestInit = {};

    refreshAccessToken: () => Promise<void>;

    constructor (url: string, options: ApiRequestOptions) {
      this.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      if (isAbsolutePath(url)) {
        this.url = url;
      } else {
        this.url = `${options.baseUrl}${url}`;
      }
    }

  public setPrefix(prefix: string) {
    this.url = `${this.url}/${prefix}`;
  }

  public setRefreshTokenMethod(refreshTokenMethod: () => Promise<void>) {
    this.refreshAccessToken = refreshTokenMethod;
  }

  private _buildQueryParams (queryParams: queryParams) {
      const query = this.queryParams ? { ...this.queryParams, ...queryParams } : queryParams;
      let q = Object.entries(query).map(([k, value]) => {
        if (value === undefined || value === null) {
          return null;
        }
        if (Array.isArray(value)) {
          return value.map(v => [k, encodeURIComponent(v)].join('=')).join('&');
        }
        return [k, encodeURIComponent(value as string | boolean | number)].join('=');
      }).filter(Boolean).join('&');
      if (this.url.indexOf('?') === -1 && q) { q = `?${q}`; }
      return q;
    }

    private async _checkResponseStatus<R, E> (response: Response): Promise<ClientResponse<R>> {
      if (response.status >= 200 && response.status < 400) {
        const data = await response.text();
        const parsedResponse: R = JSON.parse(data);
        return { isSuccessRequest: response.status >= 200 && response.status < 400, status: response.status, data: parsedResponse };
      } else {
        throw new ResponseError<E>(response);
      }
    }

    private async _fetch<R, E = any> (method: string, path?: string, body?: BodyInit | null, query?: queryParams): Promise<ClientResponse<R>> {
      const apiPath = new URL(path, this.url);
      const token = localStorage.getItem(Tokens.ACCESS_TOKEN);
      if (token) {
        this.setHeaders({ 'Authorization': `Bearer ${token}` });
      }
      try {
        return fetch(apiPath + this._buildQueryParams(query),
          { ...this.options, method: method, headers: this.headers, body: body })
          .then(resp => this._checkResponseStatus<R, E>(resp));
      } catch (error) {
        if (error instanceof ResponseError && error.code === 403) {
          await this.refreshAccessToken();
        }
        throw error;
      }
    }

    public setHeaders (headers: HeadersInit, override?: boolean) {
      const keep = override ? {} : this.headers;
      this.headers = { ...keep, ...headers };
      return this;
    }

    public setQueryParams (queryParams: {[key: string]: string}, override = true) {
      const keep = override ? {} : this.queryParams;
      this.queryParams = { ...keep, ...queryParams };
      return this;
    }

    public setOptions (options: RequestInit) {
      this.options = options;
      return this;
    }

    public head<R, E>(path?: string) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch<R, E>('HEAD', fullUrl);
    }

    public get<R, E>(path?: string, query?: queryParams) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch<R, E>('GET', fullUrl, null, query);
    }

    public post<R, E>(path?: string, body?: BodyInit | null) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch<R, E>('POST', fullUrl, body);
    }

    public put<R, E>(path?: string, body?: BodyInit | null) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch<R, E>('PUT', fullUrl, body);
    }

    public patch<R, E>(path?: string, body?: BodyInit | null) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch<R, E>('PATCH', fullUrl, body);
    }

    public delete<R, E>(path?: string, body?: BodyInit | null) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch<R, E>('DELETE', fullUrl, body);
    }

    public all<T> (requests: Array<ClientResponse<T> | Promise<ClientResponse<T>>>): Promise<ClientResponse<T>[]> {
      return Promise.all<ClientResponse<T>>(requests);
    }

    public spread<T, R> (callback: (...args: T[]) => R): (array: T[]) => R {
      return function wrap (arr) {
        // eslint-disable-next-line prefer-spread
        return callback.apply(null, arr);
      };
    }
}
