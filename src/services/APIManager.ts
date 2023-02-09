/**
 * API manager.
 */
import {EventEmitter} from './Events';

export const APIManagerEvents = {
  LOAD_START: 'load_start',
  LOAD_END: 'load_end',
};

/**
 * Service providing tools for CRUD the rest API.
 */
class APIManagerClass extends EventEmitter {

  /**
   * The api URL.
   * @type {string | null}
   * @private
   */
  private url: string | null | undefined;

  /**
   * Init Api Url.
   *
   * @param string url
   *   The URL.
   * @returns {this}
   */
  public setApiBaseUrl(url: string) {
    if (this.url) {
      throw new Error('API Url already set');
    }
    this.url = url;

    return this;
  }

  /**
   * Return API Base url.
   *
   * @returns {string}
   */
  public getApiBaseUrl(): string {
    if (!this.url) {
      throw new Error('API Url is not set');
    }
    return this.url;
  }

  /**
   * Method GET
   * @param {string} path
   * @param params
   * @returns {Promise<any>}
   */
  async get(path: string, params: any = {}): Promise<any> {
    // Init url.
    const url = this.getUrl(path, params);

    // Init header.
    const headers = {
      method: 'GET',
    };

    return this.fetchData(url, headers);
  }

  /**
   * Post.
   *
   * @param {string} path
   * @param data
   * @param params
   * @returns {Promise<any>}
   */
  async post(path: string, data: any = {}, params: any = {}): Promise<any> {
    // Init url.
    const url: URL = this.getUrl(path, params);

    // Init header.
    const headers = {
      method: 'POST',
      body: JSON.stringify(data),
    };

    return this.fetchData(url, headers);
  }

  /**
   * Post.
   *
   * @param {string} path
   * @param data
   * @param params
   * @returns {Promise<any>}
   */
  async patch(path: string, data: any = {}, params: any = {}): Promise<any> {
    // Init url.
    const url: URL = this.getUrl(path, params);

    // Init header.
    const headers = {
      method: 'PATCH',
      body: JSON.stringify(data),
    };

    return this.fetchData(url, headers);
  }

  /**
   * Post.
   *
   * @param {string} path
   * @param data
   * @param params
   * @returns {Promise<any>}
   */
  async delete(path: string, params: any = {}): Promise<any> {
    // Init url.
    const url: URL = this.getUrl(path, params);

    // Init header.
    const headers = {
      method: 'DELETE',
    };

    return this.fetchData(url, headers);
  }

  /**
   * Get URL from parameters and path.
   *
   * @param {string} path
   * @param params
   * @returns {URL}
   * @private
   */
  private getUrl(path: string, params: any = {}): URL {
    const url = new URL(this.getApiBaseUrl());
    url.pathname = path;

    /**
     * In case of mulitple search, API is waiting for &id=1&id2 instead of &id=1,2
     */
    if (typeof params.id === 'object') {
      Object.keys(params).filter((key) => key !== 'id').forEach((key: string) => url.searchParams.set(key, params[key]));

      params.id.forEach((value: string) => {
        url.search += `&id=${value}`;
      });
    } else {
      Object.keys(params).forEach((key: string) => url.searchParams.set(key, params[key]));
    }

    return url;
  }

  /**
   * Check valid response.
   *
   * @param {Response} res
   * @returns {0 | false | boolean}
   * @private
   */
  private isValidResponse(res: Response) {
    return res.status && res.status >= 200 && res.status < 300;
  }

  /**
   * Return json resonse.
   *
   * @param {URL} url
   * @param headers
   * @returns {string}
   * @private
   */
  private async fetchData(url: URL, headers: any) {
    // Init headers.
    headers.headers = new Headers();
    headers.headers.append('Content-Type', 'application/json');
    url.searchParams.append('_format', 'json');

    let response: Response;
    let body: string;

    try {
      this.emit(APIManagerEvents.LOAD_START);
      response = await fetch(url.toString(), headers);
    } catch (error) {
      console.error(`Bad response : ${url.toString()}`);
      console.log(error);
      return null;
    }
    this.emit(APIManagerEvents.LOAD_END);
    if (this.isValidResponse(response)) {
      try {
        body = await response.json();
      } catch (error) {
        console.error(`Response is not JSON : ${url.toString()}`);
        const text = await response.text();
        throw text;
      }
      return body;
    } else {
      console.error(`Bad response status ${response.status} : ${url.toString()}`);
      throw response;
    }
  }

}

export const APIManager = new APIManagerClass();
