"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = __importDefault(require("./schema/authenticate/post"));
var utils_1 = __importDefault(require("../../utils"));
var inputValidate = function (req, res, next) {
    var input = __assign(__assign(__assign({}, req.body), req.params), req.query);
    var options = {
        abortEarly: false
    };
    var schema = post_1.default;
    var error = schema.validate(input, options).error;
    if (error) {
        var message = error.details.map(function (detail) { return detail.message.replace(/(")|(")/g, ''); });
        var _a = utils_1.default.errorResponse({ message: message, code: 400 }), code = _a.code, data = _a.data;
        return res.status(code).send(data);
    }
    next();
};
exports.default = inputValidate;
