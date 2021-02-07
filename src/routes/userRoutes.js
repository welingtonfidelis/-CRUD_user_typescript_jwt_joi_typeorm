"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthMiddleware_1 = __importDefault(require("../middlewares/AuthMiddleware"));
var user_1 = __importDefault(require("../middlewares/InputValidateMiddleware/user"));
var UserController_1 = __importDefault(require("../controllers/UserController"));
var userController = new UserController_1.default();
var router = express_1.Router();
router.post('/users', user_1.default, userController.store);
router.get('/users', [AuthMiddleware_1.default, user_1.default], userController.index);
router.get('/users/:id', [AuthMiddleware_1.default, user_1.default], userController.show);
router.put('/users/:id', [AuthMiddleware_1.default, user_1.default], userController.update);
router.delete('/users/:id', [AuthMiddleware_1.default, user_1.default], userController.delete);
exports.default = router;
