"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var personSchema = new mongoose_1.default.Schema({
    name: { required: true, type: String },
    age: { required: true, type: Number },
});
var Person = mongoose_1.default.model("Person", personSchema);
exports.default = Person;
