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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var utils_1 = __importDefault(require("../utils"));
var authMiddleware = function (req, res, next) {
    try {
        var jwtSecret = process.env.JWT_SECRET;
        var authorization = req.headers.authorization;
        if (!authorization) {
            var _a = utils_1.default.errorResponse({ message: ['jwt required'], code: 401 }), code = _a.code, data_1 = _a.data;
            return res.status(code).send(data_1);
        }
        var token = authorization.replace('Bearer', '').trim();
        var data = jsonwebtoken_1.default.verify(token, jwtSecret);
        var id = data.id;
        req.userId = id;
        return next();
    }
    catch (error) {
        var _b = utils_1.default.errorResponse(__assign(__assign({}, error), { code: 401 })), code = _b.code, data = _b.data;
        return res.status(code).send(data);
    }
};
exports.default = authMiddleware;
