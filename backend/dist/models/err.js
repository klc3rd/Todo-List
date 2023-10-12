"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnError = void 0;
class Err {
    constructor(_status, _message) {
        this._status = _status;
        this._message = _message;
    }
    get status() {
        return this._status;
    }
    get message() {
        return this._message;
    }
}
exports.default = Err;
const returnError = (res, error) => {
    if (error instanceof Err) {
        res.status(error.status);
        res.json({ error: error.message });
    }
    else {
        res.json({ error });
    }
};
exports.returnError = returnError;
