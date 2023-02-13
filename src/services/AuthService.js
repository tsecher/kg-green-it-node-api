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
exports.AuthService = void 0;
/**
 * Account manager.
 */
const UserModel_1 = require("../structure/User/UserModel");
const APIManager_1 = require("./APIManager");
const LocalStorage_1 = require("./LocalStorage");
/**
 * Authentication service.
 */
class AuthServiceClass {
    /**
     * Constructor.
     */
    constructor() {
        this.store = new LocalStorage_1.LocalStorage('user');
    }
    /**
     * Return current user.
     *
     * @returns {UserModel | boolean | undefined}
     */
    getCurrentUser() {
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
    login(userName, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield APIManager_1.APIManager.post('user/login', { name: userName, pass: password });
            this.store.set('current', value);
            yield this.initCurrentUserFromStorage();
        });
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
    initCurrentUserFromStorage() {
        const data = this.store.get('current');
        if (data.current_user) {
            this.current = new UserModel_1.UserModel(data.current_user.uid, data.current_user.name);
            this.token = data.csrf_token;
        }
        else {
            this.current = false;
        }
    }
}
exports.AuthService = new AuthServiceClass();
