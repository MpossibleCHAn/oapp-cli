"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// #! ./node_modules/.bin/ts-node
const zx_1 = __importDefault(require("zx"));
void (async function () {
    await zx_1.default.$ `ls`;
})();
