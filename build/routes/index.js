"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var authentication_1 = require("./authentication");
var router = express_1.default.Router();
exports.router = router;
router.use('/auth', authentication_1.router);
router.use('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../public/welcome.html'));
});
