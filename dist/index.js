"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const build_1 = __importDefault(require("./build"));
const program = new commander_1.Command();
program.version(require("../package.json").version);
program.command("start").action(async (options) => {
    console.log(options);
    (0, build_1.default)();
});
program.parse(process.argv);
