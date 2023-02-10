"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIManager = exports.APIManagerEvents = void 0;
/**
 * API manager.
 */
const Events_1 = require("./Events");
exports.APIManagerEvents = {
    LOAD_START: 'load_start',
    LOAD_END: 'load_end',
};
/**
 * Service providing tools for CRUD the rest API.
 */
class APIManagerClass extends Events_1.EventEmitter {
    /**
     * Init Api Url.
     *
     * @param string url
     *   The URL.
     * @returns {this}
     */
    setApiBaseUrl(url) {
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
    getApiBaseUrl() {
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
    get(path, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init url.
            const url = this.getUrl(path, params);
            // Init header.
            const headers = {
                method: 'GET',
            };
            return this.fetchData(url, headers);
        });
    }
    /**
     * Post.
     *
     * @param {string} path
     * @param data
     * @param params
     * @returns {Promise<any>}
     */
    post(path, data = {}, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init url.
            const url = this.getUrl(path, params);
            // Init header.
            const headers = {
                method: 'POST',
                body: JSON.stringify(data),
            };
            return this.fetchData(url, headers);
        });
    }
    /**
     * Post.
     *
     * @param {string} path
     * @param data
     * @param params
     * @returns {Promise<any>}
     */
    patch(path, data = {}, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init url.
            const url = this.getUrl(path, params);
            // Init header.
            const headers = {
                method: 'PATCH',
                body: JSON.stringify(data),
            };
            return this.fetchData(url, headers);
        });
    }
    /**
     * Post.
     *
     * @param {string} path
     * @param data
     * @param params
     * @returns {Promise<any>}
     */
    delete(path, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init url.
            const url = this.getUrl(path, params);
            // Init header.
            const headers = {
                method: 'DELETE',
            };
            return this.fetchData(url, headers);
        });
    }
    /**
     * Get URL from parameters and path.
     *
     * @param {string} path
     * @param params
     * @returns {URL}
     * @private
     */
    getUrl(path, params = {}) {
        const url = new URL(this.getApiBaseUrl());
        url.pathname = path;
        /**
         * In case of mulitple search, API is waiting for &id=1&id2 instead of &id=1,2
         */
        if (typeof params.id === 'object') {
            Object.keys(params).filter((key) => key !== 'id').forEach((key) => url.searchParams.set(key, params[key]));
            params.id.forEach((value) => {
                url.search += `&id=${value}`;
            });
        }
        else {
            Object.keys(params).forEach((key) => url.searchParams.set(key, params[key]));
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
    isValidResponse(res) {
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
    fetchData(url, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            // Init headers.
            headers.headers = new Headers();
            headers.headers.append('Content-Type', 'application/json');
            url.searchParams.append('_format', 'json');
            let response;
            let body;
            try {
                this.emit(exports.APIManagerEvents.LOAD_START);
                response = yield fetch(url.toString(), headers);
            }
            catch (error) {
                console.error(`Bad response : ${url.toString()}`);
                console.log(error);
                return null;
            }
            this.emit(exports.APIManagerEvents.LOAD_END);
            if (this.isValidResponse(response)) {
                try {
                    body = yield response.json();
                }
                catch (error) {
                    console.error(`Response is not JSON : ${url.toString()}`);
                    const text = yield response.text();
                    throw text;
                }
                return body;
            }
            else {
                console.error(`Bad response status ${response.status} : ${url.toString()}`);
                throw response;
            }
        });
    }
}
exports.APIManager = new APIManagerClass();
