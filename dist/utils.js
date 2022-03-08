"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paths = exports.resolveApp = void 0;
const path_1 = __importDefault(require("path"));
const appRoot = process.cwd();
const resolveApp = (...relativePaths) => path_1.default.resolve(appRoot, ...relativePaths);
exports.resolveApp = resolveApp;
const srcDir = (0, exports.resolveApp)("src");
const distDir = (0, exports.resolveApp)("dist");
exports.paths = {
    static: (0, exports.resolveApp)("static"),
    dist: distDir,
    src: srcDir,
};
