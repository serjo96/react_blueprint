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

export class ResponseError extends Error {
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
        'Content-Type': 'application/json'
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

    private async _checkResponseStatus<R> (response: Response): Promise<ClientResponse<R>> {
      if (response.status >= 200 && response.status < 400) {
        const data = await response.text();
        const parsedResponse: R = JSON.parse(data);
        return { isSuccessRequest: response.status >= 200 && response.status < 400, status: response.status, data: parsedResponse };
      } else {
        throw new ResponseError(response);
      }
    }

    private async _fetch<R> (method: string, path?: string, body?: BodyInit | null, query?: queryParams): Promise<ClientResponse<R>> {
      const apiPath = new URL(path, this.url);
      const token = localStorage.getItem(Tokens.ACCESS_TOKEN);
      if (token) {
        this.setHeaders({ 'Authorization': `Bearer ${token}` });
      }
      try {
        return fetch(apiPath + this._buildQueryParams(query),
          { ...this.options, method: method, headers: this.headers, body: body })
          .then(resp => this._checkResponseStatus<R>(resp));
      } catch (error) {
        if (error instanceof ResponseError && error.code === 403) {
          await this.refreshAccessToken();
        }
        throw error;
      }
    }

    setHeaders (headers: HeadersInit, override = true) {
      const keep = override ? {} : this.headers;
      this.headers = { ...keep, ...headers };
      return this;
    }

    setQueryParams (queryParams: {[key: string]: string}, override = true) {
      const keep = override ? {} : this.queryParams;
      this.queryParams = { ...keep, ...queryParams };
      return this;
    }

    setOptions (options: RequestInit) {
      this.options = options;
      return this;
    }

    head (path?: string) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch('HEAD', fullUrl);
    }

    get<T> (path?: string, query?: queryParams): Promise<ClientResponse<T>> {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch('GET', fullUrl, null, query);
    }

    post (path?: string, body?: BodyInit | null) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch('POST', fullUrl, body);
    }

    put (path?: string, body?: BodyInit | null) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch('PUT', fullUrl, body);
    }

    patch (path?: string, body?: BodyInit | null) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch('PATCH', fullUrl, body);
    }

    delete (path?: string, body?: BodyInit | null) {
      const fullUrl = path ? this.url + path : this.url;
      return this._fetch('DELETE', fullUrl, body);
    }

    all<T> (requests: Array<ClientResponse<T> | Promise<ClientResponse<T>>>): Promise<ClientResponse<T>[]> {
      return Promise.all<ClientResponse<T>>(requests);
    }

    spread<T, R> (callback: (...args: T[]) => R): (array: T[]) => R {
      return function wrap (arr) {
        // eslint-disable-next-line prefer-spread
        return callback.apply(null, arr);
      };
    }
}
