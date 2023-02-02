"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var router = express_1.default.Router();
exports.router = router;
router.get('/signin', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../public/signin.html'));
});
router.get('/signup', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '../../public/signup.html'));
});
