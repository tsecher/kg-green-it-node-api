"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
/**
 * User model.
 */
class UserModel {
    /**
     * {@inheritdoc}
     */
    constructor(_id, name) {
        this._id = _id;
        this.name = name;
    }
    get id() {
        return this._id;
    }
}
exports.UserModel = UserModel;
