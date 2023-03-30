"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("./routes");
var dotenv_1 = __importDefault(require("dotenv"));
var passport_1 = __importDefault(require("passport"));
var jwt_1 = require("./utils/jwt");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = 4000;
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect((_a = process.env.DB_KEY) !== null && _a !== void 0 ? _a : '');
var db = mongoose_1.default.connection;
db.once('connected', function () {
    console.log('db connected');
});
db.on('error', function (error) {
    console.log(error);
});
app.use(passport_1.default.initialize());
(0, jwt_1.passportConfig)(passport_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use('/', routes_1.router);
app.listen(PORT, function () {
    console.log('Server Started');
});
