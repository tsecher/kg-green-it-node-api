/**
 * Account manager.
 */
import {LocalStorage} from '@services/LocalStorage';
import {UserModel} from '@structure/User/UserModel';

import {APIManager} from './APIManager';

/**
 * Authentication service.
 */
class AuthServiceClass {

  /**
   * The current user.
   * @type {UserModel | boolean}
   * @protected
   */
  protected current?: UserModel | boolean;

  /**
   * The csrf tokeN.
   *
   * @type {string}
   * @protected
   */
  protected token?: string;

  /**
   * Local storage.
   *
   * @type {}
   * @protected
   */
  protected store: LocalStorage;

  /**
   * Constructor.
   */
  constructor() {
    this.store = new LocalStorage('user');
  }

  /**
   * Return current user.
   *
   * @returns {UserModel | boolean | undefined}
   */
  getCurrentUser(): UserModel | boolean {
    // If this.current is false, there is no user in local storage, so it is not necessary to go further.
    if (this.current === false) {
      return false;
    }

    // Init currnt user from local storage data.
    this.initCurrentUserFromStorage();

    if (this.current) {
      return this.current;
    }
    return false;
  }

  /**
   * Log user if exists.
   *
   * @param {string} userName
   * @param {string} password
   * @returns {Promise<void>}
   */
  async login(userName: string, password: string) {
    const value = await APIManager.post('user/login', {name: userName, pass: password});
    this.store.set('current', value);
    await this.initCurrentUserFromStorage();
  }

  /**
   * Logout user.
   */
  logout() {
    this.store.delete('current');
    this.token = undefined;
    this.current = undefined;
  }

  /**
   * Init
   * @private
   */
  private initCurrentUserFromStorage() {
    const data = this.store.get('current');
    if (data.current_user) {
      this.current = new UserModel(data.current_user.uid, data.current_user.name);
      this.token = data.csrf_token;
    } else {
      this.current = false;
    }
  }
}

export const AuthService = new AuthServiceClass();