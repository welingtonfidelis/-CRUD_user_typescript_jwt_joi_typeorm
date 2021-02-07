"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userRoutes_1 = __importDefault(require("./userRoutes"));
var authRoutes_1 = __importDefault(require("./authRoutes"));
var router = express_1.Router();
router.use(userRoutes_1.default);
router.use(authRoutes_1.default);
exports.default = router;
