"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("./database/connect");
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
var port = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(routes_1.default);
app.listen(port, function () {
    console.log("\uD83D\uDE80 Running in " + port);
});
