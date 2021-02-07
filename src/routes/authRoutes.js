"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("../controllers/AuthController"));
var authenticate_1 = __importDefault(require("../middlewares/InputValidateMiddleware/authenticate"));
var authController = new AuthController_1.default();
var router = express_1.Router();
router.post('/auth', authenticate_1.default, authController.authenticate);
exports.default = router;
