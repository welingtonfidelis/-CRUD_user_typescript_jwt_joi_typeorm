"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var validate = joi_1.default.object({
    page: joi_1.default.number()
        .integer()
        .min(1),
    limit: joi_1.default.number()
        .integer()
        .min(1)
        .max(50)
});
exports.default = validate;
