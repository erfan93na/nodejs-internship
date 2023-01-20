"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
var mongoString = process.env.DATABASE_URL;
mongoose_1.default.set("strictQuery", false);
var database = null;
if (mongoString) {
    mongoose_1.default.connect(mongoString);
    database = mongoose_1.default.connection;
}
database === null || database === void 0 ? void 0 : database.on("error", console.log);
database === null || database === void 0 ? void 0 : database.once("connected", function () {
    console.log("database connected");
});
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", routes_1.default);
var PORT = 3000;
app.listen(PORT, function () {
    console.log("server started at ".concat(PORT));
});
