"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
/**
 * User repository.
 */
const UserModel_1 = require("./UserModel");
/**
 * User repository.
 */
class UserRepositoryClass {
    /**
     * {@inheritdoc}
     */
    getApiBaseRoute() {
        return 'users';
    }
    /**
     * {@inheritdoc}
     */
    getItemFromApiData(apiItemData) {
        return Promise.resolve(new UserModel_1.UserModel(apiItemData.uid, apiItemData.name));
    }
}
exports.UserRepository = new UserRepositoryClass();
