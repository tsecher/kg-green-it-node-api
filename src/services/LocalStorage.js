"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
/**
 * Locally store data if possible (exclude for node environments).
 */
class LocalStorage {
    /**
     * Create store.
     *
     * @param {string} id
     *   The store id.
     */
    constructor(id) {
        this.id = id;
        // Init getter and setter according to localStorage availability.
        if (typeof localStorage === 'undefined') {
            this.data = {};
            this.setMethod = this.setTemporaryMethod;
            this.getMethod = this.getTemporaryMethod;
            this.deleteMethod = this.deleteTemporaryMethod;
        }
        else {
            this.setMethod = this.setLocalStorageMethod;
            this.getMethod = this.getLocalStorageMethod;
            this.deleteMethod = this.deleteLocalStorageMethod;
        }
    }
    /**
     * Set store data.
     *
     * @param {string} key
     * @param value
     * @returns {this}
     */
    set(key, value) {
        this.setMethod(key, value);
        return this;
    }
    /**
     * Get stored data. Return all if key is omitted.
     *
     * @param {string} key
     * @returns {any}
     */
    get(key = null) {
        return this.getMethod(key) || {};
    }
    /**
     * Delete property in store.s
     * @param {string} key
     * @returns {this}
     */
    delete(key) {
        this.deleteMethod(key);
        return this;
    }
    /**
     * Setter for local storage store.s
     */
    setLocalStorageMethod(key, value) {
        const data = this.get();
        data[key] = value;
        // Save data in local storage.
        localStorage.setItem(this.id, JSON.stringify(data));
    }
    /**
     * Setter for local storage store.s
     */
    getLocalStorageMethod(key = null) {
        const data = JSON.parse((localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem('user')) || '{}');
        return key ? data[key] : key;
    }
    /**
     * Delete data in store.
     * @param key
     */
    deleteLocalStorageMethod(key) {
        const data = this.get();
        delete data[key];
        // Save data in local storage.
        localStorage.setItem(this.id, JSON.stringify(data));
    }
    /**
     * Setter for temporary store.
     */
    setTemporaryMethod(key, value) {
        this.data[key] = value;
    }
    /**
     * Setter for local storage store.s
     */
    getTemporaryMethod(key = null) {
        return key ? this.data[key] : this.data;
    }
    /**
     * Delete data in store.
     * @param key
     */
    deleteTemporaryMethod(key) {
        delete this.data[key];
    }
}
exports.LocalStorage = LocalStorage;
