"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var authentication_1 = require("./authentication");
var router = express_1.default.Router();
exports.router = router;
router.use('/auth', authentication_1.router);
router.get('/', passport_1.default.authenticate('jwt', { session: false }), function (req, res, next) {
    if (req.isAuthenticated())
        next();
    else {
        res.redirect('/auth/signin');
    }
}, function (req, res) {
    res.render('welcome', { username: 'erfan' });
});
