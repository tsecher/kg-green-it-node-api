"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.cbs = {};
    }
    /**
     * Listen events.
     *
     * @param {string} event
     * @param cb
     */
    on(event, cb) {
        this.cbs[event] = this.cbs[event] || [];
        this.cbs[event].push(cb);
    }
    /**
     * Emit event with data.
     *
     * @param {string} event
     * @param data
     */
    emit(event, data = {}) {
        var _a;
        (_a = this.cbs[event]) === null || _a === void 0 ? void 0 : _a.forEach((cb) => cb(data));
    }
}
exports.EventEmitter = EventEmitter;
