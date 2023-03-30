'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.router = void 0;
var express_1 = __importDefault(require('express'));
var User_1 = require('../models/User');
var jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
var router = express_1.default.Router();
exports.router = router;
router.get('/signin', function (req, res) {
  res.render('signin');
});
router.post('/signin', function (req, res) {
  var _a = req.body,
    username = _a.username,
    password = _a.password;
  User_1.User.findOne({ username: username, password: password }).then(
    function (user) {
      if (!user) return res.render('signin', { wrongCredentionals: true });
      var payload = { sub: username };
      if (process.env.JWT_KEY) {
        var token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY);
        res.cookie('token', token);
        res.redirect('/');
      }
    }
  );
});
router.get('/signup', function (req, res) {
  res.render('signup');
});
router.post('/signup', function (req, res) {
  var _a = req.body,
    username = _a.username,
    password = _a.password;
  User_1.User.findOne({ username: username })
    .then(function (user) {
      if (user) res.render('signup', { userExists: true });
      else
        return User_1.User.create({ username: username, password: password });
    })
    .then(function () {
      res.redirect('/auth/signin');
    });
});
