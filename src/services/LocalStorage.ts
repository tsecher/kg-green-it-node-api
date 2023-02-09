/**
 * Locally store data if possible (exclude for node environments).
 */
export class LocalStorage {

  private data: any;
  private setMethod: any;
  private getMethod: any;
  private deleteMethod: any;

  /**
   * Create store.
   *
   * @param {string} id
   *   The store id.
   */
  constructor(
    private id: string,
  ) {
    // Init getter and setter according to localStorage availability.
    if (typeof localStorage === 'undefined') {
      this.data = {};
      this.setMethod = this.setTemporaryMethod;
      this.getMethod = this.getTemporaryMethod;
      this.deleteMethod = this.deleteTemporaryMethod;
    } else {
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
  set(key: string, value: any): this {
    this.setMethod(key, value);
    return this;
  }

  /**
   * Get stored data. Return all if key is omitted.
   *
   * @param {string} key
   * @returns {any}
   */
  get(key: string | null = null): any {
    return this.getMethod(key) || {};
  }

  /**
   * Delete property in store.s
   * @param {string} key
   * @returns {this}
   */
  delete(key: string): this {
    this.deleteMethod(key);
    return this;
  }

  /**
   * Setter for local storage store.s
   */
  setLocalStorageMethod(key: string, value: any) {
    const data = this.get();
    data[key] = value;
    // Save data in local storage.
    localStorage.setItem(this.id, JSON.stringify(data));
  }

  /**
   * Setter for local storage store.s
   */
  getLocalStorageMethod(key: string | null = null) {
    const data = JSON.parse(localStorage?.getItem('user') || '{}');
    return key ? data[key] : key;
  }

  /**
   * Delete data in store.
   * @param key
   */
  deleteLocalStorageMethod(key: string) {
    const data = this.get();
    delete data[key];
    // Save data in local storage.
    localStorage.setItem(this.id, JSON.stringify(data));
  }

  /**
   * Setter for temporary store.
   */
  setTemporaryMethod(key: string, value: any) {
    this.data[key] = value;
  }

  /**
   * Setter for local storage store.s
   */
  getTemporaryMethod(key: string | null = null) {
    return key ? this.data[key] : this.data;
  }

  /**
   * Delete data in store.
   * @param key
   */
  deleteTemporaryMethod(key: string) {
    delete this.data[key];
  }

}