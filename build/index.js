"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var PORT = 4000;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', routes_1.router);
app.listen(PORT, function () {
    console.log('Server Started');
});
