"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var methods = {
    successResponse: function (data) {
        return { ok: true, response: data };
    },
    errorResponse: function (error) {
        console.log('ERROR ===> \n', error, '\n <=== ERROR');
        var code = this.validateHttpStatusCode(error.code) ? error.code : 500;
        var message = error.message || 'Internal server error';
        return { code: code, data: { ok: false, message: message } };
    },
    validateHttpStatusCode: function (code) {
        var isValid = code
            && Number.isInteger(code)
            && code >= 100
            && code < 600;
        return isValid;
    }
};
exports.default = methods;
